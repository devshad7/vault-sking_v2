"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { ImageKitProvider } from "@imagekit/next";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ImageKitProvider
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
        >
          {children}
        </ImageKitProvider>
      </MotionConfig>
    </LazyMotion>
  );
}