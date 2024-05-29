import { DashboardMobileSidebar } from "./mobile-sidebar";
import { DashboardUserButton } from "./user-button";

export const DashboardHeader = () => {
  return (
    <header className="sticky top-0 min-h-6 bg-white p-2 border-b flex justify-between items-center">
      <div>
        <DashboardMobileSidebar />
      </div>
      <div>
        <DashboardUserButton />
      </div>
    </header>
  );
};
