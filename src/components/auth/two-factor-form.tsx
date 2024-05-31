"use client";

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

import { twoFactor } from "@/actions/two-factor";
import { ReturnType } from "@/actions/two-factor/types";

import { SIGNIN_ROUTE } from "@/routes";

import { AuthCardWrapper } from "./card-wrapper";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { FormError } from "../form/error";
import { FormSuccess } from "../form/success";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const submit = async (
  _: ReturnType,
  formData: FormData
): Promise<ReturnType> => {
  const data = Object.fromEntries(formData.entries());

  return twoFactor(data);
};

export const TwoFactorAuthForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const urlSuccess = searchParams.get("success");
  const token = searchParams.get("token");

  const [{ error, success, fieldErrors }, formAction] = useFormState(submit, {
    error: !token
      ? "Missing token"
      : urlError
      ? urlError.split("_").join(" ")
      : undefined,
    success: urlSuccess ? urlSuccess.split("_").join(" ") : undefined,
  });

  return (
    <AuthCardWrapper
      title="Two Factor Authentication"
      subTitle="We've sent your code in your email"
      backButtonHref={SIGNIN_ROUTE}
      backButtonText="Go back to signin page"
    >
      <form className="space-y-2" action={formAction}>
        <input hidden id="token" name="token" defaultValue={token ?? ""} />
        <FormInput
          errors={fieldErrors?.code}
          label="Code"
          id="code"
          name="code"
          type="code"
        />
        <div className="flex items-center gap-2">
          <Checkbox name="remember_device" id="remember_device" />
          <Label htmlFor="remember_device">Remember this device</Label>
        </div>

        {fieldErrors?.token && (
          <FormError className="rounded-sm">Token is required</FormError>
        )}
        {error && <FormError className="rounded-sm">{error}</FormError>}
        {success && <FormSuccess className="rounded-sm">{success}</FormSuccess>}
        <FormSubmit className="w-full">Continue</FormSubmit>
      </form>
    </AuthCardWrapper>
  );
};
