export type TripType = "AIRPORT" | "ONEWAY" | "ROUNDTRIP" | "HOURLY" | "MULTIDAY";

export type RouteStatus = "ACTIVE" | "INACTIVE";
export type VehicleStatus = "AVAILABLE" | "MAINTENANCE" | "INACTIVE";

export interface Route {
  id?: string;
  name: string;
  pickup: string;
  destination: string;
  image: string;
  gallery: string[];
  description: string;
  locations?: { title: string }[];
  isMostBooked: boolean;
  distanceKm: number;
  estimatedHours: number;
  startingPrice: number;
  status: RouteStatus;
  assignedDrivers?: string[];
  seoTitle?: string;
  seoDesc?: string;
  termsAndConditions?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface Vehicle {
  id?: string;
  name: string;
  type: string;
  image: string;
  gallery: string[];
  description: string;
  maxAdults: number;
  maxChildren: number;
  maxInfants: number;
  maxAgeAdult?: number;
  maxAgeChild?: number;
  maxAgeInfant?: number;
  maxBags: number;
  maxBagWeight: number;
  ac: boolean;
  fuelType: string;
  transmission: "MANUAL" | "AUTOMATIC";
  luggageCapacity: string;
  status: VehicleStatus;
  createdAt?: number;
  updatedAt?: number;
}

export interface VehiclePricing {
  id?: string;
  routeId: string;
  vehicleId: string;
  tripType: TripType;
  price: number;
  updatedAt?: number;
}

export interface Driver {
  id?: string;
  name: string;
  phone: string;
  photo: string;
  license: string;
  emergencyContact: string;
  status: "ACTIVE" | "INACTIVE";
  availability: "AVAILABLE" | "ON_TRIP" | "OFF_DUTY";
  assignedVehicleId?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface Booking {
  id?: string;
  routeId: string;
  routeName: string;
  vehicleId: string;
  tripType: string;
  pickupDate: string;
  pickupTime: string;
  adults: number;
  children: number;
  infants: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  price: number;
  status: "PENDING_PAYMENT" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  assignedDriverId?: string;
  invoiceNumber?: string;
  createdAt: number;
  updatedAt?: number;
}
