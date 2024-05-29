import { Suspense } from "react";

import { VerificationForm } from "@/components/auth/verification-form";

export default function VerificationPage() {
  return (
    <Suspense fallback={<></>}>
      <VerificationForm />
    </Suspense>
  );
}
