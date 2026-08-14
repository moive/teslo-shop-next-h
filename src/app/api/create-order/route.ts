import { NextResponse } from "next/server";
import { setTransactionId } from "@/actions";

const PAYPAL_API_URL =
  process.env.PAYPAL_API_URL ?? "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret =
    process.env.PAYPAL_CLIENT_SECRET ?? process.env.PAYPAL_SECRET_KEY;

  if (!clientId || !clientSecret) {
    throw new Error(
      "NEXT_PUBLIC_PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET/PAYPAL_SECRET_KEY is missing from the environment.",
    );
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error_description ??
        data?.error ??
        "Failed to retrieve PayPal access token",
    );
  }

  return data.access_token as string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { orderId, amount } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing the orderId for the order" },
        { status: 400 },
      );
    }

    const amountValue = Number(amount ?? 0);
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            invoice_id: String(orderId),
            amount: {
              currency_code: "USD",
              value: amountValue.toFixed(2),
            },
          },
        ],
      }),
    });

    const data = await response.json();
    const transactionId = data.id;
    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.details?.[0]?.issue ??
            data?.message ??
            "Failed to create PayPal order",
        },
        { status: response.status },
      );
    }

    const { ok, message } = await setTransactionId(orderId, transactionId);

    if (!ok) throw new Error(message);

    return NextResponse.json({ orderId: transactionId });
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 },
    );
  }
}
