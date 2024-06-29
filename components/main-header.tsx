import { LockIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const MainHeader = () => {
  return (
    <header className="fixed top-0 w-full p-4">
      <nav className="flex items-center justify-between w-full">
        <LockIcon />
        <div className="flex items-center justify-center gap-2">
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
          <Button
            type="button"
            className="font-bold"
            size={"sm"}
            variant={"secondary"}
          >
            Sign Up
          </Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
