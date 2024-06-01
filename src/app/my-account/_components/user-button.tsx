import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

import { ADMIN_DASHBOARD_ROUTE } from "@/routes";

import { UserButtonMenu } from "@/components/auth/user-button/menu";
import { UserButtonMenuSignout } from "@/components/auth/user-button/signout-button";
import { UserButtonAvatar } from "@/components/auth/user-button/user-avatar";
import { UserButtonEmail } from "@/components/auth/user-button/user-email";
import { UserButtonName } from "@/components/auth/user-button/user-name";

export const AccountUserButton = () => {
  return (
    <UserButtonMenu
      className="flex justify-start"
      items={[
        {
          node: (
            <Link
              href={ADMIN_DASHBOARD_ROUTE}
              className="flex items-center w-full"
            >
              <LayoutDashboardIcon className="size-4 mr-2" />
              Admin dashboard
            </Link>
          ),
          onlyRoles: ["ADMIN"],
        },
        {
          node: <UserButtonMenuSignout />,
        },
      ]}
    >
      <div className="flex gap-2 justify-start">
        <UserButtonAvatar />
        <div className="text-left">
          <UserButtonName />
          <UserButtonEmail className="text-xs" />
        </div>
      </div>
    </UserButtonMenu>
  );
};
