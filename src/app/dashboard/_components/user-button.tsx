import { UserButton } from "@/components/auth/user-button";
import { UserButtonMenu } from "@/components/auth/user-button/menu";
import { UserButtonMenuSignout } from "@/components/auth/user-button/signout-button";
import { UserButtonAvatar } from "@/components/auth/user-button/user-avatar";
import { UserButtonEmail } from "@/components/auth/user-button/user-email";
import { UserButtonName } from "@/components/auth/user-button/user-name";
export const DashboardUserButton = () => {
  return (
    <UserButton>
      <UserButtonMenu
        items={[
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
    </UserButton>
  );
};
