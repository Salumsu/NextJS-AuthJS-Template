import { Suspense } from "react";

import { SigninForm } from "@/components/auth/signin-form";

export default function SigninPage() {
  return (
    <Suspense fallback={<></>}>
      <SigninForm />
    </Suspense>
  );
}
