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
        <Package className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Orders</span>
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
        <Package className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Orders</span>
      </button>
    </SignInButton>
  );
};

export default OrdersButton;
