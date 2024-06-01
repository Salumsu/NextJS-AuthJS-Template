import { AccountInformationForm } from "@/components/account/information-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountPage() {
  return (
    <Card className="h-full lg:mx-2 bg-neutral-50 p-2 !rounded-none shadow-sm lg:rounded-sm">
      <CardHeader>
        <CardTitle>Update your information</CardTitle>
        <h3 className="ml-1">Keep your information up to date.</h3>
      </CardHeader>

      <main className="mx-8">
        <AccountInformationForm />
      </main>
    </Card>
  );
}
