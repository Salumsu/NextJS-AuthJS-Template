"use client";

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

import { register } from "@/actions/register";
import { ReturnType } from "@/actions/register/types";

import { SIGNIN_ROUTE } from "@/routes";

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

  return register(data);
};

export const SignupForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const urlSuccess = searchParams.get("success");

  const [{ error, success, fieldErrors }, formAction] = useFormState(submit, {
    error: urlError ? urlError.split("_").join(" ") : undefined,
    success: urlSuccess ? urlSuccess.split("_").join(" ") : undefined,
  });

  return (
    <AuthCardWrapper
      title="Sign Up"
      subTitle="Join us now!"
      socialsMessage="or use"
      backButtonHref={SIGNIN_ROUTE}
      backButtonText="Already have an account?"
    >
      <form className="space-y-2" action={formAction}>
        <FormInput
          errors={fieldErrors?.name}
          label="Name"
          id="name"
          name="name"
        />
        <FormInput
          errors={fieldErrors?.email}
          label="Email"
          id="email"
          name="email"
          type="email"
        />
        <FormInput
          errors={fieldErrors?.password}
          label="Password"
          id="password"
          name="password"
          type="password"
        />

        {error && <FormError className="rounded-sm">{error}</FormError>}
        {success && <FormSuccess className="rounded-sm">{success}</FormSuccess>}
        <FormSubmit className="w-full">Sign up</FormSubmit>
      </form>
    </AuthCardWrapper>
  );
};
