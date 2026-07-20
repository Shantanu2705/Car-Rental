"use server";

import { adminDb } from "@/lib/firebase-admin";
import { Driver } from "@/types";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "drivers";

export async function createDriver(data: Omit<Driver, "id" | "createdAt" | "updatedAt">) {
  if (!adminDb) throw new Error("Firebase Admin not initialized");

  try {
    const docRef = await adminDb.collection(COLLECTION_NAME).add({
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    revalidatePath("/admin/drivers");
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error creating driver:", error);
    return { success: false, error: error.message };
  }
}

import { serializeDoc } from "@/lib/utils";

export async function getDrivers(): Promise<{ success: boolean; data?: Driver[]; error?: string }> {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    const snapshot = await adminDb.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
    const drivers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...serializeDoc(doc.data())
    })) as Driver[];
    
    return { success: true, data: drivers };
  } catch (error: any) {
    console.error("Error fetching drivers:", error);
    return { success: false, error: error.message };
  }
}

export async function updateDriver(id: string, data: Partial<Driver>) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).update({
      ...data,
      updatedAt: Date.now(),
    });
    
    revalidatePath("/admin/drivers");
    revalidatePath(`/admin/drivers/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error updating driver:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteDriver(id: string) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).delete();
    revalidatePath("/admin/drivers");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting driver:", error);
    return { success: false, error: error.message };
  }
}
