import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ShieldCheck, 
  CarFront, 
  Map, 
  Receipt,
  Users
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Next-Gen Car Rental Platform
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Manage your fleet <br className="hidden sm:block" />
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">ultimate precision.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            A complete, end-to-end solution for car rental businesses. Experience seamless bookings, dynamic pricing, and powerful administrative control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-lg shadow-primary/25 rounded-full">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto rounded-full bg-background/50 backdrop-blur-sm border-border hover:bg-muted">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Features Showcase */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Admin Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to run your car rental business smoothly, beautifully packaged in an intuitive dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<CarFront className="w-8 h-8 text-primary" />}
              title="Advanced Fleet Management"
              description="Track vehicles, manage maintenance statuses, set passenger limits, and configure specific vehicle attributes like AC and transmission."
            />
            <FeatureCard 
              icon={<Map className="w-8 h-8 text-blue-500" />}
              title="Dynamic Route Pricing"
              description="Configure custom routes with dynamic pricing based on trip types (One-way, Round-trip, Airport transfers). Setup specific terms and conditions per route."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
              title="Complete Booking Control"
              description="Review, edit, and manage all bookings in one place. Adjust customer details, dates, and pricing on the fly with real-time updates."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-purple-500" />}
              title="Driver Assignment"
              description="Maintain a roster of professional drivers. Assign drivers to specific trips, track their availability, and manage emergency contacts."
            />
            <FeatureCard 
              icon={<Receipt className="w-8 h-8 text-amber-500" />}
              title="Automated Invoicing"
              description="Generate professional PDF invoices instantly. Automatically assign unique invoice numbers and include driver details for corporate clients."
            />
            <FeatureCard 
              icon={<div className="font-bold text-2xl text-rose-500">₹</div>}
              title="Revenue Analytics"
              description="Visualize your earnings with our comprehensive dashboard. Track daily revenue, total bookings, and monitor your active fleet performance."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your business?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of modern car rental companies upgrading their digital presence today.
          </p>
          <Link href="/admin/login">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full border border-border shadow-sm">
              Explore Admin Portal
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-primary/20 flex flex-col items-start text-left">
      <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
