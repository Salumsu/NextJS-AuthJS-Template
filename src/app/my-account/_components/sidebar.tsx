import { Separator } from "@/components/ui/separator";
import { AccountNavItem } from "./nav-item";
import { AccountUserButton } from "./user-button";

export const AccountSidebar = () => {
  return (
    <nav className="min-w-[250px] h-full flex flex-col justify-between bg-neutral-50 lg:rounded-sm shadow-sm p-2 ">
      <div className="space-y-4">
        <div className="text-center mt-4">
          <h1 className="text-xl font-semibold">Account settings</h1>
        </div>
        <Separator />
        <ul>
          <li>
            <AccountNavItem text="Account information" href="/my-account" />
          </li>
          <li>
            <AccountNavItem
              text="Two factor auth"
              href="/my-account/two-factor-auth"
            />
          </li>
        </ul>
      </div>
      <AccountUserButton />
    </nav>
  );
};
