import { NextResponse } from "next/server";
import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        { ok: false, message: "Missing the PayPal orderId." },
        { status: 400 },
      );
    }

    const result = await paypalCheckPayment(orderId);

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Capture PayPal order error:", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to capture the order.",
      },
      { status: 500 },
    );
  }
}
