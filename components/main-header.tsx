import { LockIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const MainHeader = () => {
  return (
    <header className="fixed top-0 w-full p-4">
      <nav className="flex items-center justify-between w-full">
        <LockIcon />
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            className="font-bold"
            size={"sm"}
            variant={"default"}
          >
            Sign In
          </Button>
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
