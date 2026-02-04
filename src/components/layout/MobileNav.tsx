import { LayoutDashboard, Wallet, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Investments", url: "/investments", icon: Wallet },
  { title: "Profile", url: "/profile", icon: User },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/50 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
}
