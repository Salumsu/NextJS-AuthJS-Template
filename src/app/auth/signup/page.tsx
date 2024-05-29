import { Suspense } from "react";

import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <Suspense fallback={<></>}>
      <SignupForm />
    </Suspense>
  );
}
