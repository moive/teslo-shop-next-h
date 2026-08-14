"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "Failed to obtain the verification token.",
    };
  }

  const resp = await capturePayPalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: "Error verifying the payment.",
    };
  }

  const { status } = resp;

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Payment has not yet been completed on PayPal.",
    };
  }

  try {
    const existingOrder = await prisma.order.findFirst({
      where: {
        transactionId: paypalTransactionId,
      },
    });

    if (!existingOrder) {
      return {
        ok: false,
        message: "Could not find the local order associated with the payment.",
      };
    }

    await prisma.order.update({
      where: { id: existingOrder.id },
      data: {
        isPaid: true,
        paidAt: new Date(),
        transactionId: paypalTransactionId,
      },
    });

    revalidatePath(`/orders/${existingOrder.id}`);

    return {
      ok: true,
      orderId: existingOrder.id,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "500 - Payment could not be completed.",
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET_KEY =
    process.env.PAYPAL_CLIENT_SECRET ?? process.env.PAYPAL_SECRET_KEY;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET_KEY || !oauth2Url) {
    console.error("PayPal env missing:", {
      PAYPAL_CLIENT_ID: !!PAYPAL_CLIENT_ID,
      PAYPAL_SECRET_KEY: !!PAYPAL_SECRET_KEY,
      PAYPAL_OAUTH_URL: !!oauth2Url,
    });
    return null;
  }

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
    "utf-8",
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  try {
    const response = await fetch(oauth2Url, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("PayPal token error:", result);
      return null;
    }

    return result.access_token ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const capturePayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string,
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalApiUrl =
    process.env.PAYPAL_API_URL ?? "https://api-m.sandbox.paypal.com";
  const paypalCaptureUrl = `${paypalApiUrl}/v2/checkout/orders/${paypalTransactionId}/capture`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);
  myHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch(paypalCaptureUrl, {
      method: "POST",
      headers: myHeaders,
      cache: "no-store",
    });

    const resp = await response.json();
    console.log(JSON.stringify(resp, null, 2));

    if (!response.ok) {
      console.error("PayPal capture error:", resp);
      return resp as PayPalOrderStatusResponse;
    }

    console.log({ resp });
    return resp as PayPalOrderStatusResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
};
