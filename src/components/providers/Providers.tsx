"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  return (
    <PayPalProvider
      clientId={clientId}
      environment="sandbox"
      components={["paypal-payments", "paypal-guest-payments"]}
      pageType="checkout"
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalProvider>
  );
};
