"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface AccountNavItemProps {
  text: string;
  href: string;
}

export const AccountNavItem = ({ text, href }: AccountNavItemProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "text-gray-400 w-full block p-2 rounded-md text-left hover:bg-gray-100 transition-all",
        pathname === href && "text-gray-800 pl-2"
      )}
    >
      {text}
    </Link>
  );
};
