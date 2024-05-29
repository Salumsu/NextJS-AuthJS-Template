"use client";

import { LogOutIcon } from "lucide-react";

import { SignoutButton } from "../signout-button";

export const UserButtonMenuSignout = () => {
  return (
    <SignoutButton>
      <div className="text-left flex items-center gap-2">
        <LogOutIcon className="size-4" />
        Sign out
      </div>
    </SignoutButton>
  );
};
