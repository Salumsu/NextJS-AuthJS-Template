import { redirect } from "next/navigation";

import { NON_ADMIN_SIGNIN_REDIRECT } from "@/routes";

import { DashboardHeader } from "./_components/header";
import { DashboardDesktopSidebar } from "./_components/desktop-sidebar";

import { getCurrentUserRole } from "@/lib/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const currentUserRole = await getCurrentUserRole();

  if (!currentUserRole || currentUserRole !== "ADMIN") {
    return redirect(NON_ADMIN_SIGNIN_REDIRECT);
  }

  return (
    <div className="h-full flex">
      <DashboardDesktopSidebar />
      <div className="flex-grow  overflow-y-auto">
        <DashboardHeader />
        <div className="min-h-min">{children}</div>
      </div>
    </div>
  );
}
