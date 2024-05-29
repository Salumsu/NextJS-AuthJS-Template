"use client";

import { useSession } from "next-auth/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Muse be used inside Session Provider
 */
export const UserButtonAvatar = ({ ...rest }: AvatarProps) => {
  const session = useSession();

  const user = session.data?.user;

  if (session.status === "loading") {
    return <UserButtonAvatar.Skeleton className={rest.className} />;
  }

  if (session.status === "unauthenticated") {
    return null;
  }

  return (
    <Avatar {...rest}>
      <AvatarImage src={user?.image ?? undefined} />
      <AvatarFallback>{user?.name ? user.name.charAt(0) : "A"}</AvatarFallback>
    </Avatar>
  );
};

UserButtonAvatar.Skeleton = function AvatarSkeleton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={className} />;
};
