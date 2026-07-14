"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";

const buttonClassName =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors duration-200";

const OrdersButton = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div className="h-5 w-5 animate-pulse rounded bg-surface" />;
  }

  if (isSignedIn) {
    return (
      <Link href="/order" className={buttonClassName}>
        <Package className="h-6 w-6" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <SignInButton
      mode="modal"
      forceRedirectUrl="/order"
      signUpForceRedirectUrl="/order"
    >
      <button type="button" className={buttonClassName}>
         <Package className="h-6 w-6" aria-hidden="true" />
      </button>
    </SignInButton>
  );
};

export default OrdersButton;
