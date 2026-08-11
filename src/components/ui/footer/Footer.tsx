"use client";

import { useEffect, useState } from "react";
import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span
          className={`${loaded ? titleFont.className : ""} antialiased font-bold`}
        >
          Teslo
        </span>
        <span> | shop</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="mx-3">
        Privacity &amp; Legal
      </Link>
      <Link href="/" className="mx-3">
        Locations
      </Link>
    </div>
  );
};
