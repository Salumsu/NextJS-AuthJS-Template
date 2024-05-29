import { PropsWithChildren } from "react";

import { signout } from "@/actions/signout";

export const SignoutButton = ({ children }: PropsWithChildren) => {
  return (
    <form action={signout} className="w-full">
      <button type="submit" className="w-full">
        {children}
      </button>
    </form>
  );
};
