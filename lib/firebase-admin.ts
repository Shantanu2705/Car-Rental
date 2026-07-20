import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const firebaseAdminConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // The private key must be formatted correctly. In Vercel, it might have literal '\n' which need to be replaced.
  // It also might have accidental quotes around it if pasted incorrectly.
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").replace(/^"|"$/g, '')
    : undefined,
};

export const createFirebaseAdminApp = () => {
  if (getApps().length > 0) {
    return getApp();
  }

  // Ensure config is present before initializing
  if (!firebaseAdminConfig.projectId || !firebaseAdminConfig.privateKey || !firebaseAdminConfig.clientEmail) {
    console.warn("Firebase Admin missing configuration. Ensure FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID are set.");
    return null;
  }

  return initializeApp({
    credential: cert(firebaseAdminConfig),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
};

const adminApp = createFirebaseAdminApp();
const adminAuth = adminApp ? getAuth(adminApp) : null;
const adminDb = adminApp ? getFirestore(adminApp) : null;
const adminStorage = adminApp ? getStorage(adminApp) : null;

export { adminAuth, adminDb, adminStorage };
