import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Booking } from "@/types";
import { formatDateISTOnly } from "@/lib/utils";

export async function generateInvoice(booking: Booking, driverName?: string) {
  const doc = new jsPDF();
  
  // 1. Prepare Watermark and Logo
  let watermarkDataUrl: string | null = null;
  let originalLogoDataUrl: string | null = null;
  let wmWidth = 0;
  let wmHeight = 0;
  try {
    const img = new Image();
    img.src = '/watermark.png';
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Get original logo for header
      ctx.drawImage(img, 0, 0);
      originalLogoDataUrl = canvas.toDataURL('image/png');
      
      // Clear canvas for watermark
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get grey version for watermark keeping details
      ctx.filter = 'grayscale(100%)';
      ctx.drawImage(img, 0, 0);
      watermarkDataUrl = canvas.toDataURL('image/png');
      
      wmWidth = img.width;
      wmHeight = img.height;
    }
  } catch (e) {
    console.error("Watermark generation failed", e);
  }

  // Brand Header
  if (originalLogoDataUrl && wmWidth > 0 && wmHeight > 0) {
    const logoW = 20;
    const logoH = (wmHeight / wmWidth) * logoW;
    // Adjust y to visually align with text
    doc.addImage(originalLogoDataUrl, 'PNG', 14, 14, logoW, logoH);
    
    doc.setFontSize(24);
    doc.setTextColor(218, 165, 32); // Gold color for heading
    doc.text("CAR DICTIONARY", 40, 24);
    
    doc.setFontSize(10);
    doc.setTextColor(0); // Black
    doc.text("Premium Car Rental & Tours", 40, 30);
    doc.text("Email: support@cardictionary.com", 40, 35);
    doc.text("Phone: +91 98765 43210", 40, 40);
  } else {
    doc.setFontSize(24);
    doc.setTextColor(218, 165, 32); // Gold color for heading
    doc.text("CAR DICTIONARY", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(0); // Black
    doc.text("Premium Car Rental & Tours", 14, 28);
    doc.text("Email: support@cardictionary.com", 14, 33);
    doc.text("Phone: +91 98765 43210", 14, 38);
  }

  // Invoice Details (Right Aligned)
  doc.setFontSize(12);
  doc.setTextColor(218, 165, 32); // Gold for heading
  doc.text("INVOICE", 170, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(0); // Black
  doc.text(`Invoice No: ${booking.invoiceNumber || booking.id?.slice(0, 8).toUpperCase()}`, 150, 28);
  doc.text(`Date: ${formatDateISTOnly(booking.createdAt)}`, 150, 33);
  doc.text(`Status: ${booking.status.replace("_", " ")}`, 150, 38);
  if (driverName) {
    doc.text(`Driver: ${driverName}`, 150, 43);
  }

  // Line separator
  doc.setDrawColor(218, 165, 32); // Gold line
  doc.setLineWidth(0.5);
  doc.line(14, 48, 196, 48);

  // Customer Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(218, 165, 32); // Gold
  doc.text("Billed To:", 14, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0); // Black
  doc.text(`Name: ${booking.customerName}`, 14, 62);
  doc.text(`Phone: ${booking.customerPhone}`, 14, 67);
  doc.text(`Email: ${booking.customerEmail}`, 14, 72);

  // Journey Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(218, 165, 32); // Gold
  doc.text("Journey Details:", 110, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0); // Black
  doc.text(`Route: ${booking.routeName}`, 110, 62);
  doc.text(`Type: ${booking.tripType}`, 110, 67);
  doc.text(`Pickup: ${booking.pickupDate} at ${booking.pickupTime}`, 110, 72);
  doc.text(`Passengers: ${booking.adults}A, ${booking.children}C, ${booking.infants}I`, 110, 77);

  // Table
  autoTable(doc, {
    startY: 90,
    head: [['Description', 'Trip Type', 'Amount']],
    body: [
      [`Premium Vehicle Rental - ${booking.routeName}`, booking.tripType, `INR ${booking.price}`],
    ],
    theme: 'grid',
    headStyles: { fillColor: [218, 165, 32], textColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40, halign: 'right' }
    }
  });

  // @ts-ignore
  const finalY = doc.lastAutoTable.finalY || 90;

  // Total
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(218, 165, 32); // Gold
  doc.text(`Total Amount: INR ${booking.price}`, 150, finalY + 15);

  // Company Stamp & Signature
  let stampY = finalY + 40;
  
  // Draw Stamp Box
  doc.setDrawColor(218, 165, 32); // Gold
  doc.setLineWidth(0.5);
  doc.rect(140, stampY - 5, 55, 35);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0); // Black
  doc.text("For CAR DICTIONARY", 145, stampY + 2);
  
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${formatDateISTOnly(Date.now())}`, 145, stampY + 9);
  
  doc.setFont("helvetica", "italic");
  doc.setTextColor(150);
  doc.text("Company Stamp", 154, stampY + 18);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);
  doc.text("Authorized Signatory", 145, stampY + 27);

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(0); // Black
  doc.text("Thank you for choosing CarDictionary. Have a safe journey!", 14, 280);

  // Add borders and watermarks to all pages
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Golden border
    doc.setDrawColor(218, 165, 32);
    doc.setLineWidth(1.5);
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10);
    
    // Watermark
    if (watermarkDataUrl && wmWidth > 0 && wmHeight > 0) {
      const targetW = 140; // Big watermark
      const targetH = (wmHeight / wmWidth) * targetW;
      const x = (doc.internal.pageSize.width - targetW) / 2;
      const y = (doc.internal.pageSize.height - targetH) / 2;
      
      const gState = new (doc as any).GState({opacity: 0.4}); // Increased opacity for darker watermark
      doc.setGState(gState);
      doc.addImage(watermarkDataUrl, 'PNG', x, y, targetW, targetH);
      doc.setGState(new (doc as any).GState({opacity: 1.0}));
    }
  }

  // Save the PDF
  doc.save(`Invoice_${booking.id?.slice(0, 8)}.pdf`);
}
