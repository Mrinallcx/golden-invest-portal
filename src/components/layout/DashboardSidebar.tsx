import { LayoutDashboard, Wallet, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import totoFinanceLogo from "@/assets/toto-finance-logo.svg";
import totoIcon from "@/assets/toto-icon.svg";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Investments", url: "/investments", icon: Wallet },
  { title: "Profile", url: "/profile", icon: User },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background">
      {/* Header */}
      <div className="h-16 flex items-center px-5 border-b border-border">
        {!isCollapsed ? (
          <img src={totoFinanceLogo} alt="TOTO Finance" className="h-10 w-auto" />
        ) : (
          <img src={totoIcon} alt="TOTO" className="h-9 w-9" />
        )}
      </div>

      <SidebarContent className="flex flex-col h-full">
        {/* Navigation */}
        <SidebarGroup className="flex-1 py-6 px-3">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto border-t border-border p-4">
          {/* Toggle */}
          <SidebarTrigger className={`w-full h-9 flex items-center gap-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors mb-3 ${isCollapsed ? "justify-center" : "px-3"}`}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </SidebarTrigger>

          {/* User */}
          <div className={`flex items-center gap-3 py-2 ${isCollapsed ? "justify-center" : ""}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
            )}
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            className={`w-full mt-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 ${isCollapsed ? "justify-center px-0" : "justify-start"}`}
            onClick={() => console.log("Logout")}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}