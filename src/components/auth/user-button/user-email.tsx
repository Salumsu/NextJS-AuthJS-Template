"use client";

import { useSession } from "next-auth/react";
import { ComponentProps } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

export const UserButtonEmail = ({ ...rest }: ComponentProps<"p">) => {
  const session = useSession();
  const user = session.data?.user;

  if (session.status === "loading") {
  }

  if (session.status === "unauthenticated") {
    return null;
  }

  return <p {...rest}>{user?.email}</p>;
};

UserButtonEmail.Skeleton = function UserEmailSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <Skeleton className={cn("w-8 text-transparent inline", className)}>
      Placeholder
    </Skeleton>
  );
};
