export const metadata = {
  title: "About Us | Apex Travel",
  description: "Learn more about Apex Travel, your premium car rental and tour booking platform.",
};

import { Shield, Star, Clock, Map } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Secure",
      description: "Your safety is our top priority. All our vehicles undergo regular maintenance and safety checks.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Service",
      description: "Experience the highest standards of comfort and professional service with our trained drivers.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "We are always here for you. Our support team is available round the clock for any assistance.",
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Extensive Network",
      description: "Covering all major routes and destinations across North Eastern India.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About <span className="text-primary">Apex Travel</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for premium car rentals and unforgettable tours across North Eastern India.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded with a vision to redefine travel experiences in North Eastern India, Apex Travel has grown to become the region's most trusted car rental and tour operator. We understand that every journey is special, whether it's a corporate trip, a family vacation, or an adventurous exploration.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our fleet comprises a wide range of meticulously maintained vehicles, from comfortable sedans to spacious SUVs and luxury coaches. Coupled with our team of experienced, courteous, and knowledgeable drivers, we ensure that your journey is as beautiful as the destination itself.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-muted/50 border border-border flex items-center justify-center">
               {/* Placeholder for an image */}
               <div className="text-center p-6">
                 <Map className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                 <p className="text-muted-foreground font-medium">Scenic Drives Across North East</p>
               </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We are committed to providing you with the best travel experience possible.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
