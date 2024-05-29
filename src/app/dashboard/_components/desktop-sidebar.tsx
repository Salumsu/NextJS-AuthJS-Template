"use client";

import { DashboardSidebar } from "./sidebar";

export const DashboardDesktopSidebar = () => {
  return (
    <div className="sticky top-0 border-r hidden lg:block">
      <DashboardSidebar />
    </div>
  );
};
