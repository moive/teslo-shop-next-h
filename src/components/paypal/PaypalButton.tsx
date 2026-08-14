"use client";

import { useRouter } from "next/navigation";
import {
  INSTANCE_LOADING_STATE,
  OnApproveDataOneTimePayments,
  PayPalGuestPaymentButton,
  PayPalOneTimePaymentButton,
  usePayPal,
} from "@paypal/react-paypal-js/sdk-v6";

interface Props {
  orderId: string;
  amount: number;
}

const PayPalSkeleton = () => (
  <div className="flex w-full flex-col gap-3 animate-pulse">
    <div className="h-[45] w-full rounded-md bg-gray-300" />
    <div className="h-[45] w-full rounded-md bg-gray-300" />
  </div>
);

export const PaypalButton = ({ orderId, amount }: Props) => {
  const { loadingStatus } = usePayPal();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
    return <PayPalSkeleton />;
  }

  const router = useRouter();

  const createOrder = async () => {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, amount: roundedAmount }),
    });
    if (!response.ok) {
      throw new Error("Failed to create order 😒");
    }

    const { orderId: transactionId } = await response.json();
    console.log({ transactionId });
    return { orderId: transactionId };
  };

  const onApprove = async ({ orderId }: OnApproveDataOneTimePayments) => {
    await fetch(`/api/capture-order/${orderId}`, {
      method: "POST",
    });

    router.refresh();
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="w-full">
        <PayPalOneTimePaymentButton
          className="w-full"
          createOrder={createOrder}
          presentationMode="auto"
          onApprove={onApprove}
        />
      </div>

      <div className="w-full">
        <PayPalGuestPaymentButton
          createOrder={async () => {
            const response = await fetch("/api/create-order", {
              method: "POST",
            });
            const { orderId } = await response.json();
            return { orderId };
          }}
          onApprove={async ({ orderId }) => {
            await fetch(`/api/capture-order/${orderId}`, {
              method: "POST",
            });
          }}
        />
      </div>
    </div>
  );
};
