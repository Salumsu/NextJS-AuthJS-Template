"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FcMenu } from "react-icons/fc";
import { PropsWithChildren } from "react";
import { AccountSidebar } from "./sidebar";

export const AccountMobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <FcMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <AccountSidebar />
      </SheetContent>
    </Sheet>
  );
};
