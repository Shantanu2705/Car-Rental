import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Booking } from "@/types";
import { formatDateISTOnly } from "@/lib/utils";

export function generateInvoice(booking: Booking, driverName?: string) {
  const doc = new jsPDF();
  
  // Brand Header
  doc.setFontSize(24);
  doc.setTextColor(218, 165, 32); // Gold color
  doc.text("APEX TRAVEL", 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Premium Car Rental & Tours", 14, 28);
  doc.text("Email: support@apextravel.com", 14, 33);
  doc.text("Phone: +91 98765 43210", 14, 38);

  // Invoice Details (Right Aligned)
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("INVOICE", 170, 22);
  
  doc.setFontSize(10);
  doc.text(`Invoice No: ${booking.invoiceNumber || booking.id?.slice(0, 8).toUpperCase()}`, 150, 28);
  doc.text(`Date: ${formatDateISTOnly(booking.createdAt)}`, 150, 33);
  doc.text(`Status: ${booking.status.replace("_", " ")}`, 150, 38);
  if (driverName) {
    doc.text(`Driver: ${driverName}`, 150, 43);
  }

  // Line separator
  doc.setDrawColor(200);
  doc.line(14, 48, 196, 48);

  // Customer Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Billed To:", 14, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Name: ${booking.customerName}`, 14, 62);
  doc.text(`Phone: ${booking.customerPhone}`, 14, 67);
  doc.text(`Email: ${booking.customerEmail}`, 14, 72);

  // Journey Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Journey Details:", 110, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
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
  doc.text(`Total Amount: INR ${booking.price}`, 150, finalY + 15);

  // Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(150);
  doc.text("Thank you for choosing Apex Travel. Have a safe journey!", 14, 280);

  // Save the PDF
  doc.save(`Invoice_${booking.id?.slice(0, 8)}.pdf`);
}
