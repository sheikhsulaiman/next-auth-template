import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPassForm from "@/components/auth/reset-pass-form";

const ResrtPassword = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Verification.</CardTitle>
        <CardDescription>
          Please wait while we verify your token.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPassForm />
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

export default ResrtPassword;
