"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Route, Vehicle, VehiclePricing, TripType } from "@/types";
import { createBooking } from "@/lib/actions/booking.actions";

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
import { Loader2, Users, Briefcase } from "lucide-react";

const formSchema = z.object({
  tripType: z.enum(["AIRPORT", "ONEWAY", "ROUNDTRIP", "HOURLY", "MULTIDAY"]),
  pickupDate: z.string().min(1, "Date is required."),
  pickupTime: z.string().min(1, "Time is required."),
  adults: z.number().min(1),
  children: z.number().min(0),
  infants: z.number().min(0),
  vehicleId: z.string().min(1, "Please select a vehicle."),
  customerName: z.string().min(2, "Name is required."),
  customerEmail: z.string().email("Valid email required."),
  customerPhone: z.string().min(10, "Valid phone required."),
  specialRequests: z.string().optional(),
});

interface BookingFormProps {
  route: Route;
  vehicles: Vehicle[];
  pricing: VehiclePricing[];
}

export function BookingForm({ route, vehicles, pricing }: BookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripType: "ONEWAY",
      pickupDate: "",
      pickupTime: "",
      adults: 2,
      children: 0,
      infants: 0,
      vehicleId: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      specialRequests: "",
    },
  });

  const watchTripType = form.watch("tripType");
  const watchVehicleId = form.watch("vehicleId");

  const getAvailableVehicles = () => {
    // Only return vehicles that have pricing set for this trip type
    const validPricing = pricing.filter(p => p.tripType === watchTripType && p.price > 0);
    const validVehicleIds = validPricing.map(p => p.vehicleId);
    return vehicles.filter(v => validVehicleIds.includes(v.id!));
  };

  const getPrice = (vid: string) => {
    const p = pricing.find(p => p.vehicleId === vid && p.tripType === watchTripType);
    return p ? p.price : 0;
  };

  const availableVehicles = getAvailableVehicles();

  const handleNextStep = async () => {
    const isValid = await form.trigger(["tripType", "pickupDate", "pickupTime", "adults", "children", "vehicleId"]);
    if (isValid) setStep(2);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      // Save to Firebase "bookings" collection
      const finalPrice = getPrice(values.vehicleId);
      
      const payload = {
        ...values,
        routeId: route.id!,
        routeName: route.name,
        price: finalPrice,
        status: "PENDING_PAYMENT" as const,
        createdAt: Date.now()
      };

      const res = await createBooking(payload);
      
      if (res.success) {
        // Pass details via URL or store in Context for checkout page
        router.push(`/checkout?amount=${finalPrice}&booking=${route.name}&id=${res.id}`);
      } else {
        alert("Failed to create booking: " + res.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden">
      <div className="bg-primary/5 p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-2xl font-bold">Book Your Journey</h2>
        <div className="text-sm font-medium text-muted-foreground">
          Step {step} of 2
        </div>
      </div>

      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="tripType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trip Type</FormLabel>
                        <Select onValueChange={(val) => {
                          field.onChange(val);
                          form.setValue("vehicleId", ""); // Reset vehicle when trip type changes
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Trip Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ONEWAY">One Way</SelectItem>
                            <SelectItem value="ROUNDTRIP">Round Trip</SelectItem>
                            <SelectItem value="AIRPORT">Airport Transfer</SelectItem>
                            <SelectItem value="MULTIDAY">Multi Day</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pickupDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pickupTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <FormField control={form.control} name="adults" render={({ field }) => (
                    <FormItem><FormLabel>Adults</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : 1)} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="children" render={({ field }) => (
                    <FormItem><FormLabel>Children</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : 0)} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="infants" render={({ field }) => (
                    <FormItem><FormLabel>Infants</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : 0)} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold">Select Vehicle</h3>
                  
                  {availableVehicles.length === 0 ? (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                      No vehicles are priced for this trip type. Please contact support.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {availableVehicles.map((v) => (
                        <div 
                          key={v.id}
                          onClick={() => form.setValue("vehicleId", v.id!)}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                            watchVehicleId === v.id 
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="w-24 h-16 bg-muted rounded overflow-hidden shrink-0">
                            {v.image && <img src={v.image} className="w-full h-full object-contain" alt={v.name} />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold">{v.name}</h4>
                            <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {v.maxAdults + v.maxChildren} <span className="text-[10px] opacity-70">(+{v.maxInfants})</span></span>
                              <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {v.maxBags} <span className="text-[10px] opacity-70">({v.maxBagWeight}kg ea)</span></span>
                              <span>{v.ac ? "AC" : "Non-AC"}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Price</p>
                            <p className="text-xl font-bold text-foreground">₹{getPrice(v.id!)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {form.formState.errors.vehicleId && (
                    <p className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.vehicleId.message}</p>
                  )}
                </div>

                <Button type="button" size="lg" className="w-full" onClick={handleNextStep}>
                  Continue to Contact Details
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="WhatsApp number preferred" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any specific requirements..." rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="w-1/3">
                    Back
                  </Button>
                  <Button type="submit" size="lg" disabled={loading} className="w-2/3">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}

          </form>
        </Form>
      </div>
    </div>
  );
}
