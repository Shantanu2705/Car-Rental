"use server";

import { adminDb } from "@/lib/firebase-admin";
import { Vehicle } from "@/types";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "vehicles";

export async function createVehicle(data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">) {
  if (!adminDb) throw new Error("Firebase Admin not initialized");

  try {
    const docRef = await adminDb.collection(COLLECTION_NAME).add({
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    revalidatePath("/admin/vehicles");
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error creating vehicle:", error);
    return { success: false, error: error.message };
  }
}

import { serializeDoc } from "@/lib/utils";

export async function getVehicles(): Promise<{ success: boolean; data?: Vehicle[]; error?: string }> {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    const snapshot = await adminDb.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
    const vehicles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...serializeDoc(doc.data())
    })) as Vehicle[];
    
    return { success: true, data: vehicles };
  } catch (error: any) {
    console.error("Error fetching vehicles:", error);
    return { success: false, error: error.message };
  }
}

export async function updateVehicle(id: string, data: Partial<Vehicle>) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).update({
      ...data,
      updatedAt: Date.now(),
    });
    
    revalidatePath("/admin/vehicles");
    revalidatePath(`/vehicle/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error updating vehicle:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteVehicle(id: string) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).delete();
    revalidatePath("/admin/vehicles");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting vehicle:", error);
    return { success: false, error: error.message };
  }
}
