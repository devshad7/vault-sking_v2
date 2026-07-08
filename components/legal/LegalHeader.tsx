"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface LegalHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export function LegalHeader({ icon: Icon, title, subtitle }: LegalHeaderProps) {
  return (
    <div className="sticky top-0 z-20 bg-surface/90 backdrop-blur-md px-6 py-6 border-b border-border shadow-sm">
      <DialogHeader>
        <div className="flex items-center gap-4 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg border border-border">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-semibold tracking-tight text-text">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-text-muted mt-1">
              {subtitle}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
    </div>
  );
}
