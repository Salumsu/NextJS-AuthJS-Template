"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FcMenu } from "react-icons/fc";
import { DashboardSidebar } from "./sidebar";
import { useEffect, useState } from "react";

export const DashboardMobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-max py-1 lg:hidden" size="sm" variant="ghost">
          <FcMenu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
};
