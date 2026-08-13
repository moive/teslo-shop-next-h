"use client";

import {
  INSTANCE_LOADING_STATE,
  OnApproveDataOneTimePayments,
  PayPalGuestPaymentButton,
  PayPalOneTimePaymentButton,
  usePayPal,
} from "@paypal/react-paypal-js/sdk-v6";

const PayPalSkeleton = () => (
  <div className="flex w-full flex-col gap-3 animate-pulse">
    <div className="h-[45] w-full rounded-md bg-gray-300" />
    <div className="h-[45] w-full rounded-md bg-gray-300" />
  </div>
);

export const PaypalButton = () => {
  const { loadingStatus } = usePayPal();

  if (loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
    return <PayPalSkeleton />;
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="w-full">
        <PayPalOneTimePaymentButton
          className="w-full"
          createOrder={async () => {
            const response = await fetch("/api/create-order", {
              method: "POST",
            });
            const { orderId } = await response.json();
            return { orderId };
          }}
          presentationMode="auto"
          onApprove={async ({ orderId }: OnApproveDataOneTimePayments) => {
            await fetch(`/api/capture-order/${orderId}`, {
              method: "POST",
            });
          }}
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
