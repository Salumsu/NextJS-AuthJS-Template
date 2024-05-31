import { TwoFactorAuthForm } from "@/components/auth/two-factor-form";
import { Suspense } from "react";

export default function TwoFactorPage() {
  return (
    <Suspense fallback={<></>}>
      <TwoFactorAuthForm />
    </Suspense>
  );
}
