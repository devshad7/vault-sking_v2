"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const SignIn = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      {!isSignedIn ? (
        <SignInButton mode="modal">
          <button className="text-sm font-semibold text-primary hover:text-accent transition-colors duration-200 capitalize cursor-pointer">
            Login
          </button>
        </SignInButton>
      ) : (
        <UserButton />
      )}
    </>
  );
};

export default SignIn;
