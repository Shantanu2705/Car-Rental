"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, QrCode } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  const booking = searchParams.get("booking") || "Your Route";

  const [paymentComplete, setPaymentComplete] = useState(false);

  // Example UPI ID
  const upiId = "merchant@upi";
  const upiLink = `upi://pay?pa=${upiId}&pn=ApexTravel&am=${amount}&cu=INR`;

  if (paymentComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4">Booking Confirmed!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for choosing Apex Travel. Your booking for <strong>{booking}</strong> is confirmed. 
          We have sent the details to your email and our team will contact you shortly via WhatsApp.
        </p>
        <Link href="/">
          <Button size="lg">Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Complete Your Payment</h1>
        <p className="text-xl text-muted-foreground">
          Scan the QR code below using any UPI app (GPay, PhonePe, Paytm) to confirm your booking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* QR Code Section */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
          <div className="w-64 h-64 bg-white p-4 rounded-xl shadow-inner mb-6 relative flex items-center justify-center border-4 border-muted">
            {/* Real app would generate an actual QR code image for the upiLink */}
            {/* Using a placeholder visual for now */}
            <QrCode className="w-48 h-48 text-primary" />
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-contain bg-no-repeat bg-center opacity-80" />
          </div>
          
          <h3 className="text-2xl font-bold mb-2">₹{amount}</h3>
          <p className="text-muted-foreground mb-6">Scan to pay securely via UPI</p>
          
          <div className="w-full flex items-center gap-4 border-t border-border pt-6">
             <Button variant="default" size="lg" className="w-full" onClick={() => setPaymentComplete(true)}>
               I have completed payment
             </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground">Journey</span>
                <span className="font-medium">{booking}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span className="font-medium text-green-600">Included</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span>₹{amount}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h4 className="font-bold">100% Secure Payments</h4>
              <p className="text-sm text-muted-foreground">
                Your payments are processed securely via verified UPI gateways. 
                Free cancellation up to 48 hours before pickup.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
