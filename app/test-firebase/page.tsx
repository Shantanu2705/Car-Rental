import { adminDb } from '@/lib/firebase-admin'; 
export default function TestFirebase() { 
  return <div>FIREBASE LOADED: {adminDb ? 'YES' : 'NO'}</div> 
}
