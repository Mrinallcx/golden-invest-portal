import { LayoutDashboard, Wallet, User, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import totoFinanceLogo from "@/assets/toto-finance-logo.svg";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Investments", url: "/investments", icon: Wallet },
  { title: "Profile", url: "/profile", icon: User },
];

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background">
      {/* Header */}
      <div
        data-sidebar="header"
        className="flex h-16 items-center gap-2 border-b border-border px-3"
      >
        <SidebarTrigger className="size-8 shrink-0" />
        <div className="flex min-w-0 flex-1 items-center overflow-hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 transition-all duration-200">
          <img src={totoFinanceLogo} alt="TOTO Finance" className="h-10 w-auto shrink-0" />
        </div>
      </div>

      <SidebarContent className="flex flex-col h-full">
        {/* Navigation */}
        <SidebarGroup className="flex-1 py-6 px-3">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0" tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto border-t border-border p-4">
          {/* User */}
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                SG
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 overflow-hidden group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0 transition-all duration-200">
              <p className="text-sm font-medium truncate">Steven Gaertner</p>
              <p className="text-xs text-muted-foreground truncate">steven@totofinance.co</p>
            </div>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 justify-start group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-2"
            onClick={() => console.log("Logout")}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="ml-2 group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}