export const metadata = {
  title: "Privacy Policy | CarDictionary",
  description: "Privacy policy and data handling practices of CarDictionary.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', month: 'long', year: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information that you provide directly to us when you book a vehicle, create an account, or contact customer support. This may include your name, email address, phone number, payment information, and government-issued identification details.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to process your bookings, communicate with you about your reservations, improve our services, and send you promotional materials (if you have opted in). We also use this information for fraud prevention and to ensure the safety of our customers and vehicles.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal data to third parties. We may share your information with our service providers (e.g., payment processors, SMS gateways) strictly for the purpose of providing our services. We may also disclose your information if required by law.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal data stored with us. If you wish to exercise any of these rights, please contact our support team.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@cardictionary.com or through our contact page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
