"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileCheck,
  ShoppingCart,
  CreditCard,
  Truck,
  RefreshCcw,
  User,
  Copyright,
  AlertTriangle,
  Edit3,
  Mail,
  Tag
} from "lucide-react";
import { LegalHeader } from "./LegalHeader";
import { LegalSection } from "./LegalSection";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TermsDialog({ children, open, onOpenChange }: TermsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger>{children}</DialogTrigger>}
      <DialogContent
        showCloseButton={false}
        className="max-w-5xl h-[85vh] p-0 gap-0 overflow-hidden flex flex-col bg-bg border-border rounded-2xl shadow-xl sm:rounded-2xl"
      >
        <LegalHeader
          icon={FileCheck}
          title="Terms & Conditions"
          subtitle="Please read these terms carefully before using our website."
        />

        <ScrollArea className="flex-1 px-6 py-8 h-full">
          <div className="flex flex-col gap-6 w-full mx-auto pb-6">
            <LegalSection icon={FileCheck} title="1. Acceptance of Terms" delay={0.1}>
              <p>By accessing or using the Vault Enterprises website and services, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, you may not access our premium skincare services.</p>
              <p>These Terms apply to all visitors, users, and others who access or use our Service.</p>
            </LegalSection>

            <LegalSection icon={Tag} title="2. Products & Pricing" delay={0.2}>
              <p>All premium skincare products are subject to availability. We reserve the right to discontinue any product at any time.</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Prices are displayed in USD and are subject to change without prior notice.</li>
                <li>We strive for accuracy in product descriptions, but do not warrant that product descriptions or other content is accurate, complete, or error-free.</li>
                <li>Promotional offers are subject to specific terms and may be withdrawn at any time.</li>
              </ul>
            </LegalSection>

            <LegalSection icon={ShoppingCart} title="3. Orders" delay={0.3}>
              <p>Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order for any reason, including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Product availability limits</li>
                <li>Errors in the description or price of the product</li>
                <li>Suspicion of fraudulent or unauthorized transactions</li>
              </ul>
            </LegalSection>

            <LegalSection icon={CreditCard} title="4. Payments" delay={0.4}>
              <p>We accept major credit cards and secure online payment methods. By submitting payment information, you grant us the right to provide this information to third parties for purposes of facilitating the completion of your purchases.</p>
              <p>Your card will be charged at the time of order confirmation. All payments are processed through secure, encrypted gateways.</p>
            </LegalSection>

            <LegalSection icon={Truck} title="5. Shipping" delay={0.5}>
              <p>We offer premium shipping options to ensure your skincare products arrive safely and promptly.</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Shipping costs are calculated at checkout based on location and selected speed.</li>
                <li>Delivery times are estimates and not guaranteed.</li>
                <li>Risk of loss and title for items pass to you upon our delivery to the carrier.</li>
              </ul>
            </LegalSection>

            <LegalSection icon={RefreshCcw} title="6. Returns & Refunds" delay={0.6}>
              <p>We stand behind the quality of our premium formulations. If you are not entirely satisfied with your purchase, you may return the unused portion within 30 days of receipt.</p>
              <p>Refunds will be processed to the original method of payment within 7-10 business days of receiving the returned item. Original shipping costs are non-refundable.</p>
            </LegalSection>

            <LegalSection icon={User} title="7. User Responsibilities" delay={0.7}>
              <p>When creating an account, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for all activities under your account.</p>
              <p>You agree not to use our Service for any illegal or unauthorized purpose, nor violate any laws in your jurisdiction.</p>
            </LegalSection>

            <LegalSection icon={Copyright} title="8. Intellectual Property" delay={0.8}>
              <p>The Service and its original content (excluding User provided content), features, and functionality are and will remain the exclusive property of Vault Enterprises and its licensors.</p>
              <p>Our trademarks, trade dress, and premium brand imagery may not be used in connection with any product or service without the prior written consent of Vault Enterprises.</p>
            </LegalSection>

            <LegalSection icon={AlertTriangle} title="9. Limitation of Liability" delay={0.9}>
              <p>In no event shall Vault Enterprises, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </LegalSection>

            <LegalSection icon={Edit3} title="10. Changes to Terms" delay={1.0}>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </LegalSection>

            <LegalSection icon={Mail} title="11. Contact Information" delay={1.1}>
              <p>If you have any questions about these Terms, please contact us:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong className="text-text">Email:</strong> legal@vault-enterprises.com</li>
                <li><strong className="text-text">Phone:</strong> +1 (800) 123-4567</li>
                <li><strong className="text-text">Business address:</strong> 100 Premium Skincare Blvd, Suite 200, Los Angeles, CA 90001</li>
              </ul>
            </LegalSection>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
