"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Vehicle } from "@/types";
import { createVehicle, updateVehicle, deleteVehicle } from "@/lib/actions/vehicle.actions";

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
import { ImageUpload } from "./ImageUpload";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  type: z.string().min(2, "Type is required."),
  image: z.string().min(1, "Main image is required."),
  gallery: z.array(z.string()),
  description: z.string().min(10, "Description must be at least 10 characters."),
  maxAdults: z.number().min(1),
  maxChildren: z.number().min(0),
  maxInfants: z.number().min(0),
  maxAgeAdult: z.number().optional(),
  maxAgeChild: z.number().optional(),
  maxAgeInfant: z.number().optional(),
  maxBags: z.number().min(0),
  maxBagWeight: z.number().min(0),
  ac: z.boolean(),
  fuelType: z.string(),
  transmission: z.enum(["MANUAL", "AUTOMATIC"]),
  luggageCapacity: z.string(),
  status: z.enum(["AVAILABLE", "MAINTENANCE", "INACTIVE"]),
});

interface VehicleFormProps {
  initialData?: Vehicle;
}

export function VehicleForm({ initialData }: VehicleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      type: "SUV",
      image: "",
      gallery: [],
      description: "",
      maxAdults: 4,
      maxChildren: 2,
      maxInfants: 1,
      maxAgeAdult: 99,
      maxAgeChild: 12,
      maxAgeInfant: 2,
      maxBags: 3,
      maxBagWeight: 25,
      ac: true,
      fuelType: "Diesel",
      transmission: "MANUAL",
      luggageCapacity: "Standard",
      status: "AVAILABLE",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateVehicle(initialData.id, values);
      } else {
        await createVehicle(values);
      }
      router.push("/admin/vehicles");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url[0])}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Innova Crysta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Premium SUV" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <FormField control={form.control} name="maxAdults" render={({ field }) => (
            <FormItem><FormLabel>Max Adults</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="maxAgeAdult" render={({ field }) => (
            <FormItem><FormLabel>Adult Max Age</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="maxChildren" render={({ field }) => (
            <FormItem><FormLabel>Max Children</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="maxAgeChild" render={({ field }) => (
            <FormItem><FormLabel>Child Max Age</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="maxInfants" render={({ field }) => (
            <FormItem><FormLabel>Max Infants</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="maxAgeInfant" render={({ field }) => (
            <FormItem><FormLabel>Infant Max Age</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="maxBags" render={({ field }) => (
            <FormItem><FormLabel>Max Bags</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="maxBagWeight" render={({ field }) => (
            <FormItem><FormLabel>Max Bag Wt (kg)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || "AVAILABLE"}>
                <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="ac" render={({ field }) => (
            <FormItem>
              <FormLabel>AC / Non-AC</FormLabel>
              <Select onValueChange={(v) => field.onChange(v === "true")} value={field.value ? "true" : "false"}>
                <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="true">AC</SelectItem>
                  <SelectItem value="false">Non-AC</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the vehicle..." rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="w-full md:w-auto">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Vehicle" : "Add Vehicle"}
          </Button>

          {initialData?.id && (
            <Button
              type="button"
              variant="destructive"
              disabled={loading}
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete this vehicle?")) {
                  setLoading(true);
                  try {
                    await deleteVehicle(initialData.id!);
                    router.push("/admin/vehicles");
                    router.refresh();
                  } catch (error) {
                    console.error("Delete failed:", error);
                  } finally {
                    setLoading(false);
                  }
                }
              }}
            >
              Delete Vehicle
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
