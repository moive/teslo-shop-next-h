"use client";

import { authenticate } from "@/actions/auth/login";
import Link from "next/link";
import { useActionState } from "react";

export const LoginForm = () => {
  const [state, dispatch] = useActionState(authenticate, undefined);

  console.log(state);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input className="form-control mb-5" name="email" type="email" />

      <label htmlFor="password">Password</label>
      <input className="form-control mb-5" name="password" type="password" />

      <button type="submit" className="btn-primary">
        Log In
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create a new account
      </Link>
    </form>
  );
};
