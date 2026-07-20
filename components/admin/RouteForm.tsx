"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Route, Driver } from "@/types";
import { createRoute, updateRoute, deleteRoute } from "@/lib/actions/route.actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  pickup: z.string().min(2, "Pickup location is required."),
  destination: z.string().min(2, "Destination is required."),
  image: z.string().min(1, "Main image is required."),
  gallery: z.array(z.string()),
  description: z.string().min(10, "Description must be at least 10 characters."),
  locations: z.array(
    z.object({
      title: z.string().min(1, "Location title is required.")
    })
  ),
  assignedDrivers: z.array(z.string()),
  isMostBooked: z.boolean(),
  distanceKm: z.number().min(0),
  estimatedHours: z.number().min(0),
  startingPrice: z.number().min(0),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  termsAndConditions: z.string().optional(),
});

interface RouteFormProps {
  initialData?: Route;
  drivers?: Driver[];
}

export function RouteForm({ initialData, drivers = [] }: RouteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      locations: initialData.locations || [],
      assignedDrivers: initialData.assignedDrivers || [],
    } : {
      name: "",
      pickup: "",
      destination: "",
      image: "",
      gallery: [],
      description: "",
      locations: [],
      assignedDrivers: [],
      isMostBooked: false,
      distanceKm: 0,
      estimatedHours: 0,
      startingPrice: 0,
      status: "ACTIVE",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "locations"
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateRoute(initialData.id, values);
      } else {
        await createRoute(values);
      }
      router.push("/admin/routes");
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
              <FormLabel>Main Route Image</FormLabel>
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
                <FormLabel>Route Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Bagdogra to Gangtok" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || "ACTIVE"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="pickup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Bagdogra Airport (IXB)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Gangtok, Sikkim" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="distanceKm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance (KM)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estimatedHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Est. Time (Hours)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.5" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting Price (₹)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the route..." rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms and Conditions</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter terms and conditions for this route..." rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        {/* Dynamic Route Locations (Itinerary) */}
        <div className="border border-border p-4 rounded-md space-y-4 bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Route Itinerary (Locations)</h3>
              <p className="text-sm text-muted-foreground">Add specific stops or locations for this route.</p>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => append({ title: "" })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>
          
          <div className="space-y-3">
            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No locations added yet.</p>
            )}
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3 bg-background p-2 rounded-md border border-border">
                <span className="text-muted-foreground font-medium px-2">{index + 1}.</span>
                <FormField
                  control={form.control}
                  name={`locations.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Location name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Drivers */}
        <FormField
          control={form.control}
          name="assignedDrivers"
          render={({ field }) => (
            <FormItem className="border border-border p-4 rounded-md bg-muted/20">
              <div>
                <FormLabel className="text-lg">Assigned Drivers</FormLabel>
                <FormDescription>
                  Select which drivers are allowed to drive this route.
                </FormDescription>
              </div>
              <FormControl>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-background p-4 rounded-md border border-border max-h-[300px] overflow-y-auto">
                  {drivers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No drivers found.</p>
                  ) : (
                    drivers.map((driver) => (
                      <label key={driver.id} className="flex items-center space-x-3 space-y-0 cursor-pointer p-2 hover:bg-muted/50 rounded-md transition-colors border border-transparent hover:border-border">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary rounded border-border focus:ring-primary accent-primary"
                          checked={field.value?.includes(driver.id!)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const current = field.value || [];
                            if (checked) {
                              field.onChange([...current, driver.id!]);
                            } else {
                              field.onChange(current.filter((id) => id !== driver.id!));
                            }
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{driver.name}</span>
                          <span className="text-xs text-muted-foreground">{driver.phone}</span>
                        </div>
                        {driver.status === "ACTIVE" && driver.availability === "AVAILABLE" && (
                          <Badge variant="outline" className="ml-auto text-green-500 border-green-500/30 text-[10px]">Available</Badge>
                        )}
                      </label>
                    ))
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="w-full md:w-auto">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Route" : "Create Route"}
          </Button>

          {initialData?.id && (
            <Button
              type="button"
              variant="destructive"
              disabled={loading}
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete this route?")) {
                  setLoading(true);
                  try {
                    await deleteRoute(initialData.id!);
                    router.push("/admin/routes");
                    router.refresh();
                  } catch (error) {
                    console.error("Delete failed:", error);
                  } finally {
                    setLoading(false);
                  }
                }
              }}
            >
              Delete Route
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
