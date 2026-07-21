import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").replace(/^"|"$/g, '')
    : undefined,
};

export const createFirebaseAdminApp = () => {
  if (getApps().length > 0) {
    return getApp();
  }

  if (!firebaseAdminConfig.projectId || !firebaseAdminConfig.privateKey || !firebaseAdminConfig.clientEmail) {
    console.warn("Firebase Admin missing configuration.");
    return null;
  }

  try {
    return initializeApp({
      credential: cert(firebaseAdminConfig),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
    return null;
  }
};

const adminApp = createFirebaseAdminApp();
const adminDb = adminApp ? getFirestore(adminApp) : null;

// Lazy load auth and storage to prevent ESM module crashes in Vercel Serverless
export const getAdminAuth = async () => {
  if (!adminApp) return null;
  const { getAuth } = await import("firebase-admin/auth");
  return getAuth(adminApp);
};

export const getAdminStorage = async () => {
  if (!adminApp) return null;
  const { getStorage } = await import("firebase-admin/storage");
  return getStorage(adminApp);
};

export { adminDb };
