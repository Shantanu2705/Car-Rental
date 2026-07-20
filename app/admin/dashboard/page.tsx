import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, CalendarCheck, MapPin, Users } from "lucide-react";
import { getDashboardStats } from "@/lib/actions/dashboard.actions";
import Link from "next/link";
import { format } from "date-fns";
import { formatDateIST } from "@/lib/utils";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  if (!stats) {
    return <div className="p-6">Failed to load dashboard data.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform's performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.todayRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">₹{stats.totalRevenue.toLocaleString()} Total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            <CalendarCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Routes</CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRoutes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Drivers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDrivers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-md border border-border/50 flex items-center justify-center text-muted-foreground">
              [Revenue Chart Coming Soon]
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentBookings.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-8">
                  No recent bookings found.
                </div>
              )}
              {stats.recentBookings.map((booking: any) => {
                let dateStr = "Unknown Date";
                if (booking.createdAt) {
                  dateStr = formatDateIST(booking.createdAt);
                }
                
                return (
                  <Link href={`/admin/bookings/${booking.id}`} key={booking.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-md transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-foreground line-clamp-1">{booking.routeName || "Custom Route"}</p>
                      <p className="text-xs text-muted-foreground">{booking.customerName} • {dateStr}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-primary">₹{Number(booking.price || booking.totalAmount || 0).toLocaleString()}</p>
                      <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                        booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' :
                        booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                        booking.status === 'COMPLETED' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {booking.status || 'PENDING'}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
