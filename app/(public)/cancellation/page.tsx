export const metadata = {
  title: "Cancellation Policy | Apex Travel",
  description: "Cancellation and refund policy for Apex Travel bookings.",
};

export default function CancellationPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Cancellation Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Cancellation Rules</h2>
            <p className="text-muted-foreground leading-relaxed">
              We understand that plans can change. Our cancellation policy is designed to be as flexible as possible while ensuring fairness to our drivers and partners. To cancel a booking, please contact our support team or use the cancellation option in your booking dashboard.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cancellation Charges</h2>
            <ul className="text-muted-foreground leading-relaxed list-disc pl-6 space-y-2">
              <li><strong>48+ Hours Before Pickup:</strong> No cancellation fee. Full refund of the advance paid.</li>
              <li><strong>24 to 48 Hours Before Pickup:</strong> 10% of the total booking amount will be charged as a cancellation fee.</li>
              <li><strong>12 to 24 Hours Before Pickup:</strong> 25% of the total booking amount will be charged.</li>
              <li><strong>Less than 12 Hours or No-Show:</strong> 50% of the total booking amount will be charged.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Refund Process</h2>
            <p className="text-muted-foreground leading-relaxed">
              Refunds for eligible cancellations will be processed to the original method of payment within 5-7 business days. Depending on your bank or credit card issuer, it may take additional time for the funds to reflect in your account.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Modifications to Bookings</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you need to change your pickup time, date, or vehicle type, please contact us at least 24 hours in advance. Modifications are subject to vehicle availability and may result in a change in the total booking price.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cancellations by Apex Travel</h2>
            <p className="text-muted-foreground leading-relaxed">
              In rare circumstances (such as extreme weather conditions, natural disasters, or unexpected vehicle breakdown), Apex Travel may need to cancel your booking. In such events, we will notify you immediately and provide a 100% refund or arrange an alternative vehicle at no extra cost.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
