export const metadata = {
  title: "Terms & Conditions | Apex Travel",
  description: "Terms and conditions for using Apex Travel services.",
};

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing our website and utilizing our services, you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, you may not access the service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Booking and Reservations</h2>
            <p className="text-muted-foreground leading-relaxed">
              All bookings are subject to availability. A booking is only confirmed once you receive a confirmation email or message from Apex Travel. We reserve the right to refuse service to anyone for any reason at any time.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              A minimum advance payment is required to confirm your booking. The remaining balance must be paid before or at the start of your journey. We accept various modes of payment including credit/debit cards, net banking, and UPI.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Use of Vehicles</h2>
            <p className="text-muted-foreground leading-relaxed">
              For self-drive rentals (if applicable), the renter is responsible for any damage to the vehicle during the rental period. For chauffeur-driven cars, passengers must not engage in any activity that endangers the safety of the vehicle or driver.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Apex Travel shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
