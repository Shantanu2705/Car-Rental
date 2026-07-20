"use server";

import { adminDb, adminAuth } from "@/lib/firebase-admin";

const COLLECTION_NAME = "settings";
const SETTINGS_DOC_ID = "global";

export interface PlatformSettings {
  whatsappNumber: string;
  supportEmail: string;
  officeAddress: string;
}

const defaultSettings: PlatformSettings = {
  whatsappNumber: "+91 98765 43210",
  supportEmail: "support@apextravel.com",
  officeAddress: "Siliguri, West Bengal, India",
};

export async function getPlatformSettings(): Promise<PlatformSettings> {
  if (!adminDb) return defaultSettings;
  try {
    const doc = await adminDb.collection(COLLECTION_NAME).doc(SETTINGS_DOC_ID).get();
    if (doc.exists) {
      return doc.data() as PlatformSettings;
    }
    return defaultSettings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return defaultSettings;
  }
}

export async function updatePlatformSettings(settings: PlatformSettings) {
  if (!adminDb) throw new Error("Database not initialized");
  await adminDb.collection(COLLECTION_NAME).doc(SETTINGS_DOC_ID).set(settings, { merge: true });
  return { success: true };
}

export async function updateAdminCredentials(uid: string, email?: string, password?: string) {
  if (!adminAuth) throw new Error("Auth not initialized");
  
  const updatePayload: any = {};
  if (email) updatePayload.email = email;
  if (password) updatePayload.password = password;

  if (Object.keys(updatePayload).length > 0) {
    await adminAuth.updateUser(uid, updatePayload);
  }
  return { success: true };
}
