"use server";

import { signIn } from "@/auth.config";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if ((error as any).type === "CredentialsSignin") return "CredentialsSignin";
    console.log(error);
    return "UnKnownError";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: "Could not log in.",
    };
  }
};
