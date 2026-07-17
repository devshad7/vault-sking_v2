import Checkout from "@/components/layout/Checkout/Checkout";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Vault Skin",
  description:
    "Complete your Vault Skin order with secure checkout and fast delivery across Nepal.",
};

export default function Page() {
  return <Checkout />;
}
