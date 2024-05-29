import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const FormSuccess = ({ children, ...rest }: ComponentProps<"p">) => {
  return (
    <p
      {...rest}
      className={cn(
        "p-2 text-sm text-emerald-500 bg-emerald-500/20",
        rest.className
      )}
    >
      {children}
    </p>
  );
};
