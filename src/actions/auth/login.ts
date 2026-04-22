"use server";

import { signIn } from "@/auth.config";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
    console.log(1);
  } catch (error) {
    console.log(2);
    if (isRedirectError(error)) throw error;
    console.log(error);
    return "CredentialsSignin";
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin";
    }

    throw error;
  }
}
