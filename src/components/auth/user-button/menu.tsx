"use client";

import { PropsWithChildren } from "react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuItemProps,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

type UserButtonMenuItem = {
  props?: DropdownMenuItemProps;
  node: React.ReactNode;
};

interface UserButtonMennuProps {
  items?: UserButtonMenuItem[];
}

export const UserButtonMenu = ({
  children,
  items,
}: PropsWithChildren<UserButtonMennuProps>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px]">
        {!items ||
          (items.length <= 0 && (
            <DropdownMenuLabel>No items</DropdownMenuLabel>
          ))}
        {items &&
          items.map((item, index) => (
            <DropdownMenuItem key={index} {...item.props}>
              {item.node}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
