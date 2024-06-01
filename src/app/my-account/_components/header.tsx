import { AccountMobileSidebar } from "./mobile-sidebar";

export const AccountHeader = () => {
  return (
    <div className="bg-neutral-50 shadow-sm lg:hidden p-2">
      <AccountMobileSidebar />
    </div>
  );
};
