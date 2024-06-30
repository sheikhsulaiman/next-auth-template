import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "@/components/auth/sign-in-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialAuth } from "@/components/auth/social-auth";

const SignInPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome Back !</CardTitle>
        <CardDescription>Please Enter your Credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
        <SocialAuth />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-slate-500">Don't have an account</p>
        <Link href="/auth/signup">
          <Button variant="link">Sign Up</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
