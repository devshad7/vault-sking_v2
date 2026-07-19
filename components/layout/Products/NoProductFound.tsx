"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { Loader2 } from "lucide-react";

const NoProductFound = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-surface rounded-lg w-full mt-10",
        className
      )}
    >
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-primary">
          No Product Available
        </h2>
      </m.div>

      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-primary/80"
      >
        We&apos;re sorry, but there are no products matching on{" "}
        <span className="text-base font-semibold text-darkColor">
          {selectedTab}
        </span>{" "}
        criteria at the moment.
      </m.p>

      <m.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="flex items-center space-x-2 text-primary text-lg"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>We&apos;re restocking shortly</span>
      </m.div>

      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-primary/60"
      >
        Please check back later or explore our other product categories.
      </m.p>
    </div>
  );
};

export default NoProductFound;