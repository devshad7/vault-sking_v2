import React from "react";
import AuthBrandPanel from "./AuthBrandPanel";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
   <div
  className="flex flex-col md:flex-row bg-bg"
  style={{
    minHeight: "100vh",
  }}
>
      <AuthBrandPanel />

      <div className="relative bg-secondary/50 flex w-full md:w-[60%] flex-col items-center justify-center px-4 py-6 md:px-8 md:py-0 overflow-y-auto">
        {/* Soft radial decoration, kept subtle against the light background */}
        <div className="pointer-events-none absolute -top-32 right-1/4 w-72 h-72 rounded-full bg-accent opacity-10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary opacity-5 blur-[100px]" />

        <div className="relative z-10 w-full flex flex-col items-center my-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
