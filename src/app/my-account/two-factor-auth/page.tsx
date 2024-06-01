import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountTwoFactorAuthPage() {
  return (
    <Card className="h-full lg:mx-2 bg-neutral-50 p-2 shadow-sm !rounded-none lg:rounded-sm">
      <CardHeader>
        <CardTitle>Two Factor Authentication</CardTitle>
        <h3 className="ml-1">Secure your account using your email.</h3>
      </CardHeader>
    </Card>
  );
}
