import { AccountSidebar } from "./_components/sidebar";
import { AccountHeader } from "./_components/header";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="lg:p-4 h-full bg-neutral-200">
      <div className="h-full flex">
        <span className="hidden lg:block">
          <AccountSidebar />
        </span>
        <div className="flex-grow overflow-y-auto h-full flex flex-col">
          <AccountHeader />
          <div className="min-h-min flex-grow">{children}</div>
        </div>
      </div>
    </div>
  );
}
