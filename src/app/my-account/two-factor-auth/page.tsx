import { auth } from "@/auth";
import { AccountTwoFactorAuthForm } from "@/components/account/two-factor-auth-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getTwoFactorConfirmationsByUserId } from "@/data/two-factor-auth";

export default async function AccountTwoFactorAuthPage() {
  const session = await auth();
  const twoFactorConfirmations = await getTwoFactorConfirmationsByUserId(
    session?.user?.id as string
  );

  return (
    <Card className="h-full lg:mx-2 bg-neutral-50 p-2 shadow-sm !rounded-none lg:!rounded-sm">
      <CardHeader>
        <CardTitle>Two Factor Authentication</CardTitle>
        <h3 className="ml-1">Secure your account using your email.</h3>
      </CardHeader>

      <AccountTwoFactorAuthForm
        number_of_confirmations={twoFactorConfirmations.length}
      />
    </Card>
  );
}
