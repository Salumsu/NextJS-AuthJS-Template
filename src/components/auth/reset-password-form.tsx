"use client";

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

import { resetPassword } from "@/actions/reset-password";
import { ReturnType } from "@/actions/reset-password/types";

import { SIGNUP_ROUTE } from "@/routes";

import { AuthCardWrapper } from "./card-wrapper";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { FormError } from "../form/error";
import { FormSuccess } from "../form/success";

const submit = async (
  _: ReturnType,
  formData: FormData
): Promise<ReturnType> => {
  const data = Object.fromEntries(formData.entries());

  return resetPassword(data);
};

export const ResetPasswordForm = () => {
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
      title="Reset password"
      subTitle="Enter your new password"
      backButtonHref={SIGNUP_ROUTE}
      backButtonText="Go back to signin page"
    >
      <form className="space-y-2" action={formAction}>
        <input hidden id="token" name="token" defaultValue={token ?? ""} />
        <FormInput
          errors={fieldErrors?.password}
          label="New password"
          id="password"
          name="password"
          type="password"
        />

        {error && <FormError className="rounded-sm">{error}</FormError>}
        {success && <FormSuccess className="rounded-sm">{success}</FormSuccess>}
        <FormSubmit className="w-full">Reset password</FormSubmit>
      </form>
    </AuthCardWrapper>
  );
};
