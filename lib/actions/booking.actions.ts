"use server";

import { adminDb } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "bookings";

import { Booking } from "@/types";

export async function createBooking(data: Omit<Booking, "id" | "updatedAt">) {
  if (!adminDb) throw new Error("Firebase Admin not initialized");

  try {
    const invoiceNumber = `INV-${Date.now().toString().slice(-4)}${Math.floor(1000 + Math.random() * 9000)}`;
    const docRef = await adminDb.collection(COLLECTION_NAME).add({
      ...data,
      invoiceNumber: data.invoiceNumber || invoiceNumber,
      updatedAt: Date.now(),
    });
    
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
}

import { serializeDoc } from "@/lib/utils";

export async function getBookings(): Promise<{ success: boolean; data?: Booking[]; error?: string }> {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    const snapshot = await adminDb.collection(COLLECTION_NAME).orderBy("createdAt", "desc").get();
    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...serializeDoc(doc.data())
    })) as Booking[];
    
    return { success: true, data: bookings };
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBooking(id: string, data: Partial<Booking>) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    const updateData: any = {
      ...data,
      updatedAt: Date.now(),
    };

    await adminDb.collection(COLLECTION_NAME).doc(id).update(updateData);
    
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating booking:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBooking(id: string) {
  if (!adminDb) return { success: false, error: "Firebase Admin not initialized" };

  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).delete();
    revalidatePath("/admin/bookings");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    return { success: false, error: error.message };
  }
}
