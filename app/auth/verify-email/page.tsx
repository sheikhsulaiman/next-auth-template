import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmailVerify from "@/components/auth/email-verify";

const VerifyEmail = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Verification.</CardTitle>
        <CardDescription>
          Please wait while we verify your token.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EmailVerify />
      </CardContent>
      <CardFooter className="justify-center">
        <p>
          Made by{" "}
          <span className="bg-yellow-300 text-black font-bold px-1">SONY</span>{" "}
          with <span className="text-red-500">♥</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmail;
