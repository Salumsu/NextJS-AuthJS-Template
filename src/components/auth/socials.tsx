import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

import { Button } from "@/components/ui/button";

export const Socials = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? DEFAULT_SIGNIN_REDIRECT;

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: redirectTo,
    });
  };

  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="size-6 mr-2" />
        Google
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="size-6 mr-2" />
        Github
      </Button>
    </div>
  );
};
