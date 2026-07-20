"use client";

import { useState } from "react";
import Link from "next/link";
import { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Eye, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BookingsClient({ initialBookings }: { initialBookings: Booking[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = initialBookings.filter((booking) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = booking.customerName?.toLowerCase().includes(q);
    const phoneMatch = booking.customerPhone?.includes(q);
    const invoiceMatch = booking.invoiceNumber?.toLowerCase().includes(q);
    return nameMatch || phoneMatch || invoiceMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage customer bookings and driver assignments.</p>
        </div>
      </div>

      <div className="p-4 border border-border rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-1">Search Bookings</h2>
        <p className="text-sm text-muted-foreground mb-4">Find bookings by customer name, phone number, or invoice number.</p>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice No.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No bookings found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium text-muted-foreground">{booking.invoiceNumber || "N/A"}</TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.customerName}</div>
                    <div className="text-xs text-muted-foreground">{booking.customerPhone}</div>
                  </TableCell>
                  <TableCell>{booking.routeName}</TableCell>
                  <TableCell>
                    {booking.pickupDate} <span className="text-muted-foreground text-xs">{booking.pickupTime}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      booking.status === "CONFIRMED" || booking.status === "COMPLETED" ? "default" :
                      booking.status === "PENDING_PAYMENT" ? "secondary" : 
                      booking.status === "CANCELLED" ? "destructive" : "outline"
                    }>
                      {booking.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold">₹{booking.price}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/bookings/${booking.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
