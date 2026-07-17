"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
const SignIn = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      {!isSignedIn ? (
        <Button
        variant="outline"
        className="hover:bg-accent bg-primary text-white hover:text-primary transition-colors"
      >
        <Link
          href="/sign-in"
          className="text-sm font-semibold capitalize p-1"
        >
          Login
        </Link>
      </Button>
      ) : (
        <UserButton />
      )}
    </>
  );
};

export default SignIn;
