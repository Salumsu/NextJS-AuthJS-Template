"use client";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

import { forgotPassword } from "@/actions/forgot-password";
import { ReturnType } from "@/actions/forgot-password/types";

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

  return forgotPassword(data);
};

export const ForgotPasswordForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const urlSuccess = searchParams.get("success");

  const [{ error, success, fieldErrors }, formAction] = useFormState(submit, {
    error: urlError ? urlError.split("_").join(" ") : undefined,
    success: urlSuccess ? urlSuccess.split("_").join(" ") : undefined,
  });

  return (
    <AuthCardWrapper
      title="Forgot password?"
      subTitle="Enter your email"
      backButtonHref={SIGNUP_ROUTE}
      backButtonText="Go back to signin page"
    >
      <form className="space-y-2" action={formAction}>
        <FormInput
          errors={fieldErrors?.email}
          label="Email"
          id="email"
          name="email"
          type="email"
        />

        {error && <FormError className="rounded-sm">{error}</FormError>}
        {success && <FormSuccess className="rounded-sm">{success}</FormSuccess>}
        <FormSubmit className="w-full">Reset password</FormSubmit>
      </form>
    </AuthCardWrapper>
  );
};
