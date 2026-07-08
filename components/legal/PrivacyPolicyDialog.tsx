"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Shield, Lock, FileText, Share2, UserCheck, Mail, Database } from "lucide-react";
import { LegalHeader } from "./LegalHeader";
import { LegalSection } from "./LegalSection";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PrivacyPolicyDialog({ children, open, onOpenChange }: PrivacyPolicyDialogProps) {
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
      {children && <DialogTrigger >{children}</DialogTrigger>}
      <DialogContent
        showCloseButton={false}
        className="max-w-5xl h-[85vh] p-0 gap-0 overflow-hidden flex flex-col bg-bg border-border rounded-2xl shadow-xl sm:rounded-2xl"
      >
        <LegalHeader
          icon={Shield}
          title="Privacy Policy"
          subtitle="Last updated: July 2026"
        />

        <ScrollArea className="flex-1 px-6 py-8 h-full">
          <div className="flex flex-col gap-6 w-full mx-auto pb-6">
            <LegalSection icon={FileText} title="1. Information We Collect" delay={0.1}>
              <p>When you use our services, we may collect the following types of information to ensure a seamless premium skincare shopping experience:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong className="text-text">Personal information:</strong> Name, email address, and date of birth.</li>
                <li><strong className="text-text">Contact details:</strong> Phone number and preferred contact methods.</li>
                <li><strong className="text-text">Shipping address:</strong> Delivery locations for your orders.</li>
                <li><strong className="text-text">Payment information:</strong> Processed securely through our certified payment partners.</li>
                <li><strong className="text-text">Device information:</strong> IP address, browser type, and operating system.</li>
                <li><strong className="text-text">Cookies:</strong> To remember your preferences and cart contents.</li>
              </ul>
            </LegalSection>

            <LegalSection icon={Database} title="2. How We Use Information" delay={0.2}>
              <p>Your information is used strictly to provide, maintain, and improve our services to you.</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong className="text-text">Process orders:</strong> Fulfillment, shipping, and order updates.</li>
                <li><strong className="text-text">Improve services:</strong> Analyzing store performance and user experience.</li>
                <li><strong className="text-text">Customer support:</strong> Addressing inquiries, returns, or product questions.</li>
                <li><strong className="text-text">Marketing (optional):</strong> Sending curated skincare tips and exclusive offers (only with your explicit consent).</li>
                <li><strong className="text-text">Security:</strong> Fraud prevention and protecting your account.</li>
              </ul>
            </LegalSection>

            <LegalSection icon={Lock} title="3. Data Security" delay={0.3}>
              <p>We prioritize the security of your personal data. All sensitive information, including payment details, is encrypted using industry-standard AES-256 encryption both in transit (via SSL/TLS) and at rest.</p>
              <p>We maintain strict physical, electronic, and procedural safeguards to protect your data. However, please note that no method of transmission over the Internet is 100% secure.</p>
            </LegalSection>

            <LegalSection icon={Shield} title="4. Cookies" delay={0.4}>
              <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>
              <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our premium checkout experience.</p>
            </LegalSection>

            <LegalSection icon={Share2} title="5. Third-Party Services" delay={0.5}>
              <p>We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, or assist us in analyzing how our service is used.</p>
              <p>These third parties include our certified payment processors (e.g., Stripe), analytics providers, and trusted shipping partners (e.g., FedEx, UPS). These parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            </LegalSection>

            <LegalSection icon={UserCheck} title="6. User Rights" delay={0.6}>
              <p>You maintain full control over your personal data. Under applicable privacy laws, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong className="text-text">Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong className="text-text">Correction:</strong> Request that we correct any inaccurate or incomplete data.</li>
                <li><strong className="text-text">Deletion:</strong> Request the deletion of your personal data (&quot;right to be forgotten&quot;).</li>
                <li><strong className="text-text">Withdraw consent:</strong> Opt-out of marketing communications at any time.</li>
              </ul>
            </LegalSection>

            <LegalSection icon={Mail} title="7. Contact Information" delay={0.7}>
              <p>If you have any questions about this Privacy Policy, please contact our dedicated support team:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong className="text-text">Email:</strong> privacy@vault-enterprises.com</li>
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
