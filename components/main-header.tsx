import { LockIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { auth } from "@/auth";

const MainHeader = async () => {
  const session = await auth();

  const authButtons: React.JSX.Element = session ? (
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
  ) : (
    <>
      <Link href={"/api/auth/signin"}>
        <Button
          type="button"
          className="font-bold"
          size={"sm"}
          variant={"default"}
        >
          Sign In
        </Button>
      </Link>
      <Link href={"/auth/signup"}>
        <Button
          type="button"
          className="font-bold"
          size={"sm"}
          variant={"secondary"}
        >
          Sign Up
        </Button>
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 w-full p-4">
      <nav className="flex items-center justify-between w-full">
        <LockIcon />
        <div className="flex items-center justify-center gap-2">
          {authButtons}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
