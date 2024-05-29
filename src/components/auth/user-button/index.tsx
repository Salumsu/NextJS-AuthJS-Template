import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

import { auth } from "@/auth";
import { SIGNIN_ROUTE } from "@/routes";

import { Button } from "@/components/ui/button";

interface UserbuttonProps {
  signinButton?: React.ReactNode;
}

export const UserButton = async ({
  signinButton,
  children,
}: PropsWithChildren<UserbuttonProps>) => {
  const session = await auth();

  if (!session?.user) {
    return (
      <>
        {signinButton ?? (
          <Button variant="ghost" asChild>
            <Link href={SIGNIN_ROUTE}>Sign in</Link>
          </Button>
        )}
      </>
    );
  }

  return (
    <SessionProvider session={session} refetchOnWindowFocus>
      {children}
    </SessionProvider>
  );
};
