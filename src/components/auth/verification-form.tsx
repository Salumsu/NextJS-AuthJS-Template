"use client";

import { useFormState } from "react-dom";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { ElementRef, useEffect, useRef } from "react";

import { verify } from "@/actions/verify";
import { ReturnType } from "@/actions/verify/types";

import { SIGNIN_ROUTE } from "@/routes";

import { AuthCardWrapper } from "./card-wrapper";
import { FormError } from "../form/error";
import { FormSuccess } from "../form/success";

const submit = async (
  _: ReturnType,
  formData: FormData
): Promise<ReturnType> => {
  const data = Object.fromEntries(formData.entries());

  return verify(data);
};

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const urlSuccess = searchParams.get("success");
  const token = searchParams.get("token");

  const formRef = useRef<ElementRef<"form">>(null);

  const [{ error, success, fieldErrors }, formAction] = useFormState(submit, {
    error: !token
      ? "Token not found"
      : urlError
      ? urlError.split("_").join(" ")
      : undefined,
    success: urlSuccess ? urlSuccess.split("_").join(" ") : undefined,
  });

  useEffect(() => {
    if (token) {
      formRef.current?.requestSubmit();
    }
  }, [token]);

  return (
    <AuthCardWrapper
      title="Verifying your account"
      backButtonHref={SIGNIN_ROUTE}
      backButtonText="Signin instead"
    >
      <form className="space-y-2" action={formAction} ref={formRef}>
        {!!!fieldErrors?.token && !error && !success && (
          <div className="flex justify-center items-center h-[100px]">
            <BeatLoader />
          </div>
        )}
        <input id="token" name="token" value={token ?? ""} readOnly hidden />
        {fieldErrors?.token && (
          <FormError className="rounded-sm">{fieldErrors.token}</FormError>
        )}
        {error && <FormError className="rounded-sm">{error}</FormError>}
        {success && <FormSuccess className="rounded-sm">{success}</FormSuccess>}
      </form>
    </AuthCardWrapper>
  );
};
