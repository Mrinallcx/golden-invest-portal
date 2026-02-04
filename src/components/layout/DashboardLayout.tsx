import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { MobileNav } from "./MobileNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        {/* Desktop sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 pb-20 md:p-8 md:pb-8">
            {children}
          </div>
        </main>
        
        {/* Mobile bottom navigation */}
        <MobileNav />
      </div>
    </SidebarProvider>
  );
}
