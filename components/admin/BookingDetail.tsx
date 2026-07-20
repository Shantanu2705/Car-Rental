"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Booking, Driver } from "@/types";
import { updateBooking, deleteBooking } from "@/lib/actions/booking.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2, DownloadCloud, Edit2 } from "lucide-react";
import { generateInvoice } from "@/lib/utils/invoice";

const formSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(10, "Phone number required"),
  specialRequests: z.string().optional(),
  pickupDate: z.string(),
  pickupTime: z.string(),
  price: z.number().min(0),
  adults: z.number().min(1, "At least 1 adult required"),
  children: z.number().min(0),
  infants: z.number().min(0),
  status: z.enum(["PENDING_PAYMENT", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  assignedDriverId: z.string().optional(),
});

interface BookingDetailProps {
  booking: Booking;
  drivers: Driver[];
}

export function BookingDetail({ booking, drivers }: BookingDetailProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: booking.customerName || "",
      customerEmail: booking.customerEmail || "",
      customerPhone: booking.customerPhone || "",
      specialRequests: booking.specialRequests || "",
      pickupDate: booking.pickupDate || "",
      pickupTime: booking.pickupTime || "",
      adults: booking.adults || 1,
      children: booking.children || 0,
      infants: booking.infants || 0,
      price: booking.price || 0,
      status: booking.status,
      assignedDriverId: booking.assignedDriverId || "unassigned",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const driverId = values.assignedDriverId === "unassigned" ? undefined : values.assignedDriverId;
      await updateBooking(booking.id!, {
        ...values,
        assignedDriverId: driverId,
      });
      router.refresh();
      setIsEditing(false);
      alert("Booking updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

  const currentDriverId = form.watch("assignedDriverId");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-card border border-border p-4 rounded-lg">
        <div>
          <h2 className="text-xl font-bold">Booking Details</h2>
          <p className="text-sm text-muted-foreground">Invoice No: {booking.invoiceNumber || "N/A"}</p>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          <Edit2 className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel Editing" : "Edit Booking"}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Info */}
            <div className="bg-card border border-border p-6 rounded-lg space-y-4">
              <h3 className="font-bold text-lg border-b border-border pb-2">Customer Information</h3>
              
              <FormField control={form.control} name="customerName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input disabled={!isEditing} {...field} value={field.value || ""} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="customerEmail" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input disabled={!isEditing} {...field} value={field.value || ""} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="customerPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input disabled={!isEditing} {...field} value={field.value || ""} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="specialRequests" render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl><Textarea disabled={!isEditing} {...field} value={field.value || ""} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Journey Info */}
            <div className="bg-card border border-border p-6 rounded-lg space-y-4">
              <h3 className="font-bold text-lg border-b border-border pb-2">Journey Details</h3>
              
              <div className="text-sm">
                <span className="text-muted-foreground">Route:</span> <strong>{booking.routeName}</strong>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <FormField control={form.control} name="adults" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adults</FormLabel>
                    <FormControl><Input type="number" disabled={!isEditing} {...field} value={field.value ?? 1} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="children" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Children</FormLabel>
                    <FormControl><Input type="number" disabled={!isEditing} {...field} value={field.value ?? 0} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="infants" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Infants</FormLabel>
                    <FormControl><Input type="number" disabled={!isEditing} {...field} value={field.value ?? 0} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="pickupDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Date</FormLabel>
                    <FormControl><Input type="date" disabled={!isEditing} {...field} value={field.value || ""} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="pickupTime" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Time</FormLabel>
                    <FormControl><Input type="time" disabled={!isEditing} {...field} value={field.value || ""} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Price (₹)</FormLabel>
                  <FormControl><Input type="number" disabled={!isEditing} {...field} value={field.value ?? 0} onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          {/* Management Actions */}
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-6">Manage Booking</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Status</FormLabel>
                  <Select disabled={!isEditing} onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING_PAYMENT">Pending Payment</SelectItem>
                      <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="assignedDriverId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Driver</FormLabel>
                  <Select disabled={!isEditing} onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Assign a driver" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="unassigned">-- Unassigned --</SelectItem>
                      {drivers.map(d => (
                        <SelectItem key={d.id} value={d.id!}>{d.name} ({d.availability})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
              <Button variant="outline" type="button" onClick={() => {
                const driverName = currentDriverId !== "unassigned" ? drivers.find(d => d.id === currentDriverId)?.name : undefined;
                generateInvoice(booking, driverName);
              }}>
                <DownloadCloud className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              
              {isEditing && (
                <div className="flex gap-4">
                  <Button type="button" variant="destructive" disabled={loading} size="lg" onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this booking?")) {
                      setLoading(true);
                      try {
                        await deleteBooking(booking.id!);
                        router.push("/admin/bookings");
                        router.refresh();
                      } catch (e) {
                        console.error(e);
                        alert("Failed to delete booking");
                      } finally {
                        setLoading(false);
                      }
                    }
                  }}>
                    Delete Booking
                  </Button>
                  <Button type="submit" disabled={loading} size="lg">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
