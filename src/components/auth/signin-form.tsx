"use client";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { login } from "@/actions/login";
import { ReturnType } from "@/actions/login/types";

import { FORGOT_PASSWORD_ROUTE, SIGNUP_ROUTE } from "@/routes";

import { AuthCardWrapper } from "./card-wrapper";
import { FormInput } from "@/components/form/input";
import { FormSubmit } from "@/components/form/submit";
import { FormError } from "../form/error";
import { FormSuccess } from "../form/success";
import { Button } from "../ui/button";

const submit = async (
  _: ReturnType,
  formData: FormData
): Promise<ReturnType> => {
  const data = Object.fromEntries(formData.entries());

  return login(data);
};

export const SigninForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const urlSuccess = searchParams.get("success");

  const [{ error, success, fieldErrors }, formAction] = useFormState(submit, {
    error: urlError ? urlError.split("_").join(" ") : undefined,
    success: urlSuccess ? urlSuccess.split("_").join(" ") : undefined,
  });

  return (
    <AuthCardWrapper
      title="Sign In"
      subTitle="Welcome back!"
      socialsMessage="or login with"
      backButtonHref={SIGNUP_ROUTE}
      backButtonText="Don't have an account?"
    >
      <form className="space-y-2" action={formAction}>
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

        <div className="flex justify-end">
          <Button variant="link" asChild>
            <Link href={FORGOT_PASSWORD_ROUTE}>Forgot password</Link>
          </Button>
        </div>

        {error && <FormError className="rounded-sm">{error}</FormError>}
        {success && <FormSuccess className="rounded-sm">{success}</FormSuccess>}
        <FormSubmit className="w-full">Sign in</FormSubmit>
      </form>
    </AuthCardWrapper>
  );
};
