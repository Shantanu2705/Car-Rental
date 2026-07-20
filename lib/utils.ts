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

export function formatDateIST(dateInput: any): string {
  if (!dateInput) return "N/A";
  let date: Date;
  if (typeof dateInput.toDate === 'function') {
    date = dateInput.toDate();
  } else {
    date = new Date(dateInput);
  }
  
  try {
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    return date.toLocaleString();
  }
}

export function formatDateISTOnly(dateInput: any): string {
  if (!dateInput) return "N/A";
  let date: Date;
  if (typeof dateInput.toDate === 'function') {
    date = dateInput.toDate();
  } else {
    date = new Date(dateInput);
  }
  
  try {
    return date.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {
    return date.toLocaleDateString();
  }
}

export function getTodayIST(): string {
  // Returns YYYY-MM-DD in IST
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', { 
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  // en-CA format is YYYY-MM-DD
  return formatter.format(date);
}

export function getDateIST(dateInput: any): string {
  if (!dateInput) return "";
  let date: Date;
  if (typeof dateInput.toDate === 'function') {
    date = dateInput.toDate();
  } else {
    date = new Date(dateInput);
  }
  
  const formatter = new Intl.DateTimeFormat('en-CA', { 
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(date);
}
