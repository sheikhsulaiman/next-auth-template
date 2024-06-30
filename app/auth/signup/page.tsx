import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/components/auth/sign-up-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Let's go !</CardTitle>
        <CardDescription>Please Enter your Credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-slate-500">Already have an account</p>
        <Link href="/api/auth/signin">
          <Button variant="link">Sign In</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
