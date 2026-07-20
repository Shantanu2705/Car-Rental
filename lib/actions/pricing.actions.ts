"use server";

import { adminDb } from "@/lib/firebase-admin";
import { VehiclePricing } from "@/types";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "pricing";

import { serializeDoc } from "@/lib/utils";

export async function getPricingByRoute(routeId: string): Promise<{ success: boolean; data?: VehiclePricing[]; error?: string }> {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    const snapshot = await adminDb.collection(COLLECTION_NAME).where("routeId", "==", routeId).get();
    const pricing = snapshot.docs.map(doc => ({
      id: doc.id,
      ...serializeDoc(doc.data())
    })) as VehiclePricing[];
    
    return { success: true, data: pricing };
  } catch (error: any) {
    console.error("Error fetching pricing:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePricing(pricingRecords: Omit<VehiclePricing, "id" | "updatedAt">[]) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    const batch = adminDb.batch();

    for (const record of pricingRecords) {
      // Create a predictable document ID based on route + vehicle + tripType
      const docId = `${record.routeId}_${record.vehicleId}_${record.tripType}`;
      const docRef = adminDb.collection(COLLECTION_NAME).doc(docId);
      
      batch.set(docRef, {
        ...record,
        updatedAt: Date.now()
      }, { merge: true });
    }

    await batch.commit();
    revalidatePath("/admin/pricing");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating pricing:", error);
    return { success: false, error: error.message };
  }
}
