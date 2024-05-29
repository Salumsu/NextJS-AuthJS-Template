"use client";
import { useFormStatus } from "react-dom";

import { Label, LabelProps } from "@/components/ui/label";
import { Input, InputProps } from "@/components/ui/input";

interface FormInputProps extends InputProps {
  label?: string;
  labelProps?: LabelProps;
  errors?: FormFieldErrors;
}

export const FormInput = ({
  label,
  labelProps,
  errors,
  ...rest
}: FormInputProps) => {
  const { pending } = useFormStatus();

  return (
    <div>
      {label && <Label {...labelProps}>{label}</Label>}
      <Input {...rest} disabled={rest.disabled || pending} />
      <ul className="grid gap-1 mt-1">
        {errors?.map((error) => (
          <li
            key={error}
            className="text-sm text-rose-500 list-disc list-inside"
          >
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};
