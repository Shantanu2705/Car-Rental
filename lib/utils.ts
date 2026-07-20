import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function serializeDoc(docData: any) {
  const serialized = { ...docData };
  for (const key in serialized) {
    if (serialized[key]) {
      if (typeof serialized[key].toDate === 'function') {
        serialized[key] = serialized[key].toDate().getTime();
      } else if (
        typeof serialized[key] === 'object' && 
        '_seconds' in serialized[key] && 
        '_nanoseconds' in serialized[key]
      ) {
        serialized[key] = serialized[key]._seconds * 1000 + Math.floor(serialized[key]._nanoseconds / 1000000);
      }
    }
  }
  return serialized;
}
