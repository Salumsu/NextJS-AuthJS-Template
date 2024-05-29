import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const FormError = ({ children, ...rest }: ComponentProps<"p">) => {
  return (
    <p
      {...rest}
      className={cn("p-2 text-sm text-rose-500 bg-rose-500/20", rest.className)}
    >
      {children}
    </p>
  );
};
