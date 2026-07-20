"use client";

import { useState, useEffect } from "react";
import { Route, Vehicle, TripType, VehiclePricing } from "@/types";
import { getPricingByRoute, updatePricing } from "@/lib/actions/pricing.actions";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TRIP_TYPES: TripType[] = ["AIRPORT", "ONEWAY", "ROUNDTRIP", "HOURLY", "MULTIDAY"];

interface PricingManagerProps {
  routes: Route[];
  vehicles: Vehicle[];
}

export function PricingManager({ routes, vehicles }: PricingManagerProps) {
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [pricingMap, setPricingMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!selectedRoute) return;

    const fetchPricing = async () => {
      setLoading(true);
      const res = await getPricingByRoute(selectedRoute);
      if (res.success && res.data) {
        const newMap: Record<string, number> = {};
        res.data.forEach((p) => {
          newMap[`${p.vehicleId}_${p.tripType}`] = p.price;
        });
        setPricingMap(newMap);
      }
      setLoading(false);
    };

    fetchPricing();
  }, [selectedRoute]);

  const handlePriceChange = (vehicleId: string, tripType: TripType, val: string) => {
    const num = parseInt(val, 10);
    setPricingMap(prev => ({
      ...prev,
      [`${vehicleId}_${tripType}`]: isNaN(num) ? 0 : num
    }));
  };

  const handleSave = async () => {
    if (!selectedRoute) return;
    setSaving(true);
    
    const recordsToSave: Omit<VehiclePricing, "id" | "updatedAt">[] = [];
    
    vehicles.forEach((vehicle) => {
      TRIP_TYPES.forEach((tripType) => {
        const key = `${vehicle.id!}_${tripType}`;
        const price = pricingMap[key];
        if (price !== undefined && price > 0) {
          recordsToSave.push({
            routeId: selectedRoute,
            vehicleId: vehicle.id!,
            tripType,
            price
          });
        }
      });
    });

    await updatePricing(recordsToSave);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-card p-6 border border-border rounded-lg">
        <div className="w-full sm:w-1/3">
          <label className="text-sm font-medium mb-2 block">Select Route to Configure Pricing</label>
          <Select onValueChange={(val) => val && setSelectedRoute(val)} value={selectedRoute}>
            <SelectTrigger>
              <SelectValue placeholder="Select a route..." />
            </SelectTrigger>
            <SelectContent>
              {routes.map(r => (
                <SelectItem key={r.id} value={r.id!}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSave} disabled={!selectedRoute || loading || saving} className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Pricing Matrix
        </Button>
      </div>

      {selectedRoute && (
        <div className="bg-card border border-border rounded-lg overflow-hidden relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Vehicle</TableHead>
                  {TRIP_TYPES.map(type => (
                    <TableHead key={type} className="min-w-[120px]">{type}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={TRIP_TYPES.length + 1} className="text-center py-8">
                      No vehicles available. Add vehicles first.
                    </TableCell>
                  </TableRow>
                ) : (
                  vehicles.map(vehicle => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.name} <span className="text-xs text-muted-foreground block">{vehicle.type}</span></TableCell>
                      {TRIP_TYPES.map(type => {
                        const key = `${vehicle.id}_${type}`;
                        return (
                          <TableCell key={key}>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">₹</span>
                              <Input 
                                type="number" 
                                className="pl-6 h-9"
                                value={pricingMap[key] || ""}
                                onChange={(e) => handlePriceChange(vehicle.id!, type, e.target.value)}
                                placeholder="0"
                              />
                            </div>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
