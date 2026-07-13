"use client";

import { useEffect, useRef } from "react";
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { LockKeyhole } from "lucide-react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrdersAuthGateProps {
  redirectUrl: string;
}

const OrdersAuthGate = ({ redirectUrl }: OrdersAuthGateProps) => {
  const { isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const hasOpenedSignIn = useRef(false);

  useEffect(() => {
    if (!isLoaded || isSignedIn || hasOpenedSignIn.current) return;

    hasOpenedSignIn.current = true;
    openSignIn({
      forceRedirectUrl: redirectUrl,
      signUpForceRedirectUrl: redirectUrl,
    });
  }, [isLoaded, isSignedIn, openSignIn, redirectUrl]);

  if (!isLoaded || isSignedIn) return null;

  return (
    <Container className="py-16 sm:py-24">
      <Card className="mx-auto max-w-lg text-center">
        <CardHeader className="items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LockKeyhole className="h-6 w-6" aria-hidden="true" />
          </div>
          <CardTitle>Sign in to view your orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Your orders are private. Sign in to view, track, and manage your
            purchases.
          </p>
          <SignInButton
            mode="modal"
            forceRedirectUrl={redirectUrl}
            signUpForceRedirectUrl={redirectUrl}
          >
            <Button type="button">Sign in to continue</Button>
          </SignInButton>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrdersAuthGate;
