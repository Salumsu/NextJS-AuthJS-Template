import { UserIcon } from "lucide-react";
import Link from "next/link";

import { ACCOUNT_SETTINGS_ROUTE } from "@/routes";

import { UserButtonMenu } from "@/components/auth/user-button/menu";
import { UserButtonMenuSignout } from "@/components/auth/user-button/signout-button";
import { UserButtonAvatar } from "@/components/auth/user-button/user-avatar";
import { UserButtonEmail } from "@/components/auth/user-button/user-email";
import { UserButtonName } from "@/components/auth/user-button/user-name";

export const DashboardUserButton = () => {
  return (
    <UserButtonMenu
      items={[
        {
          node: (
            <Link
              href={ACCOUNT_SETTINGS_ROUTE}
              className="flex items-center w-full"
            >
              <UserIcon className="size-4 mr-2" />
              Account Settings
            </Link>
          ),
        },
        {
          node: <UserButtonMenuSignout />,
        },
      ]}
    >
      <div className="flex gap-2">
        <div className="text-right">
          <UserButtonName />
          <UserButtonEmail className="text-xs" />
        </div>
        <UserButtonAvatar />
      </div>
    </UserButtonMenu>
  );
};
