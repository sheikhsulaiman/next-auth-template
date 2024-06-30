import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AlreadyLoggedIn = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Already Logged In</CardTitle>
        <CardDescription>
          You are already logged in. Please log out to sign up again.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={"/api/auth/signout"}>
          <Button
            type="button"
            className="font-bold"
            size={"sm"}
            variant={"default"}
          >
            Sign Out
          </Button>
        </Link>
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

export default AlreadyLoggedIn;
