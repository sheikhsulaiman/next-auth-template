"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export const SocialAuth = () => {
  return (
    <div className="my-2 space-y-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-center flex-1 gap-2">
        <Button onClick={() => signIn("google")} className="w-full gap-2">
          <img src="/images/google.png" alt="google" className="h-4 w-4" />
          Google
        </Button>
        <Button onClick={() => signIn("github")} className="w-full gap-2">
          <img src="/images/github.png" alt="github" className="h-4 w-4" />
          Github
        </Button>
      </div>
    </div>
  );
};
