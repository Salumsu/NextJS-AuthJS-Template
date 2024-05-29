"use client";

import { useFormStatus } from "react-dom";

import { Button, ButtonProps } from "@/components/ui/button";

export const FormSubmit = ({ children, ...rest }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button {...rest} disabled={rest.disabled || pending}>
      {children}
    </Button>
  );
};
