import { auth } from "@/auth";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RootPage() {
  const session = await auth();

  return (
    <div>
      Hello
      <UserButton>
        <Button variant="ghost" asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </UserButton>
    </div>
  );
}
