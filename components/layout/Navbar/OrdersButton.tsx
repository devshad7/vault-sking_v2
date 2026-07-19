"use client";

import React from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useOrders } from "@/hooks/useOrders";

const OrdersButton = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { orderCount, loading } = useOrders();

  if (!isLoaded) {
    return <div className="h-5 w-5 animate-pulse rounded bg-surface" />;
  }

  if (isSignedIn) {
    return (
      <Link href="/order" className="relative group flex items-center">
        <Package className="w-5 h-5 text-text group-hover:text-accent transition-colors duration-300" />

        <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
          {loading ? 0 : orderCount}
        </span>
      </Link>
    );
  }

  return (
    <SignInButton
      mode="redirect"
      forceRedirectUrl="/order"
      signUpForceRedirectUrl="/order"
    >
      <button
        type="button"
        className="relative group flex items-center cursor-pointer"
      >
        <Package className="w-5 h-5 text-text group-hover:text-accent transition-colors duration-300" />

        <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
          0
        </span>
      </button>
    </SignInButton>
  );
};

export default OrdersButton;