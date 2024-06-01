"use client";

import { PropsWithChildren, useMemo } from "react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuItemProps,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UserButtonMenuItem = {
  props?: DropdownMenuItemProps;
  node: React.ReactNode;
  onlyRoles?: Role[];
  hideFromRoles?: Role[];
};

interface UserButtonMennuProps extends ButtonProps {
  items?: UserButtonMenuItem[];
}

export const UserButtonMenu = ({
  children,
  items,
  ...rest
}: PropsWithChildren<UserButtonMennuProps>) => {
  const session = useSession();
  const user = session.data?.user;

  const displayItems = useMemo(() => {
    return items?.filter((item) => {
      if (item?.onlyRoles && user?.role) {
        return item.onlyRoles.includes(user?.role);
      }

      if (item?.hideFromRoles && user?.role) {
        return !item.hideFromRoles.includes(user.role);
      }
      return true;
    });
  }, [user, items]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          {...rest}
          asChild
          className={cn("py-1 cursor-pointer", rest.className)}
        >
          <span>{children}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        {!displayItems ||
          (displayItems.length <= 0 && (
            <DropdownMenuLabel>No items</DropdownMenuLabel>
          ))}
        {displayItems &&
          displayItems.map((item, index) => (
            <DropdownMenuItem key={index} {...item.props}>
              {item.node}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
