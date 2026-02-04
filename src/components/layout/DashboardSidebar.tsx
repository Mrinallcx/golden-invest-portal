import { LayoutDashboard, Wallet, User, LogOut, Menu } from "lucide-react";
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

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Investments", url: "/investments", icon: Wallet },
  { title: "Profile", url: "/profile", icon: User },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <span className="text-lg font-light tracking-tight">
            TOTO <span className="text-gradient-gold font-medium">Finance</span>
          </span>
        )}
        <SidebarTrigger className="ml-auto">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
      </div>

      <SidebarContent className="flex flex-col justify-between h-[calc(100vh-4rem)]">
        <SidebarGroup className="pt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="p-4 space-y-4">
          <Separator />
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
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
          <Button
            variant="ghost"
            className={`w-full justify-start text-muted-foreground hover:text-foreground hover:bg-sidebar-accent ${isCollapsed ? "px-2" : ""}`}
            onClick={() => console.log("Logout")}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
