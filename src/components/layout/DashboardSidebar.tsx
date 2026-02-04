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
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-card/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex h-16 items-center justify-center px-4 border-b border-border/50">
        {!isCollapsed ? (
          <img src={totoFinanceLogo} alt="TOTO Finance" className="h-8 w-auto" />
        ) : (
          <img src={totoIcon} alt="TOTO" className="h-8 w-8" />
        )}
      </div>

      {/* Toggle Button */}
      <div className="px-3 py-3 border-b border-border/50">
        <SidebarTrigger className="w-full h-8 flex items-center justify-center rounded-md hover:bg-sidebar-accent transition-colors text-muted-foreground hover:text-foreground">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </SidebarTrigger>
      </div>

      <SidebarContent className="flex flex-col justify-between flex-1">
        {/* Navigation */}
        <SidebarGroup className="pt-4 px-3">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/80 transition-all duration-200 group"
                      activeClassName="bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-medium shadow-sm"
                    >
                      <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="p-3 mt-auto">
          <Separator className="mb-4 bg-border/50" />
          
          {/* User Info */}
          <div className={`flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50 mb-3 ${isCollapsed ? "justify-center" : ""}`}>
            <Avatar className="h-9 w-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            className={`w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ${isCollapsed ? "justify-center px-2" : "px-3"}`}
            onClick={() => console.log("Logout")}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-3 text-sm">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}