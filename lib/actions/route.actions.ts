"use server";

import { adminDb } from "@/lib/firebase-admin";
import { Route } from "@/types";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "routes";

export async function createRoute(data: Omit<Route, "id" | "createdAt" | "updatedAt">) {
  if (!adminDb) throw new Error("Firebase Admin not initialized");

  try {
    const docRef = await adminDb.collection(COLLECTION_NAME).add({
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    revalidatePath("/admin/routes");
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error creating route:", error);
    return { success: false, error: error.message };
  }
}

import { serializeDoc } from "@/lib/utils";

export async function getRoutes(): Promise<{ success: boolean; data?: Route[]; error?: string }> {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    const snapshot = await adminDb.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
    const routes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...serializeDoc(doc.data())
    })) as Route[];
    
    return { success: true, data: routes };
  } catch (error: any) {
    console.error("Error fetching routes:", error);
    return { success: false, error: error.message };
  }
}

export async function updateRoute(id: string, data: Partial<Route>) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).update({
      ...data,
      updatedAt: Date.now(),
    });
    
    revalidatePath("/admin/routes");
    revalidatePath(`/route/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error updating route:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteRoute(id: string) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).delete();
    revalidatePath("/admin/routes");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting route:", error);
    return { success: false, error: error.message };
  }
}
