"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MapPin, 
  Car, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut,
  IndianRupee,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Routes", href: "/admin/routes", icon: MapPin },
  { name: "Vehicles", href: "/admin/vehicles", icon: Car },
  { name: "Pricing", href: "/admin/pricing", icon: IndianRupee },
  { name: "Drivers", href: "/admin/drivers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <img src="/watermark.png" alt="CarAdmin Logo" className="h-10 w-auto object-contain" />
          <span className="font-bold text-xl tracking-tight text-foreground">Car<span className="text-primary">Admin</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full justify-start gap-3 border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
