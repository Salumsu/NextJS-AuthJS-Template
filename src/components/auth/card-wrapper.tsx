"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { Socials } from "./socials";

interface AuthCardWrapperProps {
  title: string;
  subTitle?: string;
  socialsMessage?: string;
  backButtonText: string;
  backButtonHref: string;
}

export const AuthCardWrapper = ({
  title,
  subTitle,
  socialsMessage,
  backButtonHref,
  backButtonText,
  children,
}: PropsWithChildren<AuthCardWrapperProps>) => {
  return (
    <Card className="max-w-[400px] w-[90vw]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subTitle && <p>{subTitle}</p>}
      </CardHeader>
      <CardContent>
        {children}
        {socialsMessage && (
          <>
            <div className="flex items-center gap-2 my-4">
              <Separator className="!flex-shrink" />
              <p className="text-nowrap text-sm">{socialsMessage}</p>
              <Separator className="!flex-shrink" />
            </div>
            <Socials />
          </>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="link" asChild>
          <Link href={backButtonHref}>{backButtonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
