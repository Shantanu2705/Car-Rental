export const metadata = {
  title: "Frequently Asked Questions | Apex Travel",
  description: "Find answers to commonly asked questions about our car rental services.",
};

import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What documents are required to rent a car?",
      answer: "To rent a car, you will need a valid driving license, a government-issued ID proof (like Aadhar Card, Passport, or Voter ID), and a valid credit/debit card for security deposit purposes (if applicable).",
    },
    {
      question: "Do you provide cars with drivers?",
      answer: "Yes, we specialize in providing chauffeur-driven cars. All our drivers are highly trained, experienced, and familiar with the local routes and terrain of North East India.",
    },
    {
      question: "Are there any hidden charges?",
      answer: "No, we believe in complete transparency. The price quoted during booking includes rental charges, driver allowance, and standard taxes. Tolls and parking fees are usually extra unless specified in your package.",
    },
    {
      question: "Can I modify or cancel my booking?",
      answer: "Yes, you can modify or cancel your booking up to 24 hours before the scheduled pickup time. Please refer to our Cancellation Policy for detailed information on refunds and charges.",
    },
    {
      question: "Is there a limit on kilometers?",
      answer: "It depends on the package you choose. We offer both limited kilometer packages and unlimited kilometer packages. Any extra kilometers beyond the package limit will be charged at a standard per-kilometer rate.",
    },
    {
      question: "What happens in case of a vehicle breakdown?",
      answer: "In the rare event of a breakdown, our 24/7 support team will arrange for a replacement vehicle as quickly as possible to ensure your journey is not significantly delayed.",
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
            <div className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <details 
                  key={index} 
                  className="group border-b border-border last:border-0 pb-4 last:pb-0"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none text-left font-medium text-lg hover:text-primary transition-colors py-2">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </span>
                  </summary>
                  <div className="text-muted-foreground leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
