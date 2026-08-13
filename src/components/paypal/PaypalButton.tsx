"use client";

import {
  OnApproveDataOneTimePayments,
  PayPalGuestPaymentButton,
  PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

export const PaypalButton = () => {
  return (
    <div className="flex flex-col gap-3">
      <PayPalOneTimePaymentButton
        createOrder={async () => {
          const response = await fetch("/api/create-order", { method: "POST" });
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

      <PayPalGuestPaymentButton
        createOrder={async () => {
          const response = await fetch("/api/create-order", { method: "POST" });
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
  );
};
