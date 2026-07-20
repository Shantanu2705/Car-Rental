"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getDashboardStats() {
  if (!adminDb) return null;

  try {
    // 1. Get total bookings & today's revenue
    const bookingsSnap = await adminDb.collection("bookings").get();
    let todayRevenue = 0;
    let totalRevenue = 0;
    
    // Get today's date in IST format YYYY-MM-DD
    const { getTodayIST, getDateIST } = await import("@/lib/utils");
    const today = getTodayIST();

    const allBookings = bookingsSnap.docs.map(doc => {
      const data = doc.data();
      const amount = Number(data.price) || Number(data.totalAmount) || 0;
      
      // Only confirmed or completed bookings contribute to revenue
      if (data.status === "CONFIRMED" || data.status === "COMPLETED") {
        totalRevenue += amount;
        
        // If booked today (in IST), add to today's revenue
        if (data.createdAt) {
          if (getDateIST(data.createdAt) === today) {
            todayRevenue += amount;
          }
        }
      }

      return { id: doc.id, ...data };
    });

    const totalBookings = allBookings.length;
    
    // Sort recent bookings by createdAt descending
    const recentBookings = [...allBookings]
      .sort((a: any, b: any) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 5);

    // 2. Get active routes count
    const routesSnap = await adminDb.collection("routes").get();
    const activeRoutes = routesSnap.size;

    // 3. Get active drivers count
    const driversSnap = await adminDb.collection("drivers").where("status", "==", "ACTIVE").get();
    const activeDrivers = driversSnap.size;

    return {
      todayRevenue,
      totalRevenue,
      totalBookings,
      activeRoutes,
      activeDrivers,
      recentBookings,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return null;
  }
}
