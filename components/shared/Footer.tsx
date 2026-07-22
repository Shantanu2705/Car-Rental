import Link from "next/link";
import { Car, Mail, MapPin, Phone } from "lucide-react";
import { PlatformSettings } from "@/lib/actions/settings.actions";

export function Footer({ settings }: { settings?: PlatformSettings }) {
  const address = settings?.officeAddress || "Siliguri, West Bengal, India";
  const phone = settings?.whatsappNumber || "+91 98765 43210";
  const email = settings?.supportEmail || "support@cardictionary.com";
  const phoneLink = phone.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-card border-t border-border mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/watermark.png" alt="CarDictionary Logo" className="h-10 w-auto object-contain" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Car<span className="text-primary">Dictionary</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium car rental and tour booking platform for North Eastern India. We provide safe, comfortable, and reliable transport for your journeys.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/routes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Popular Routes</Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Fleet</Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cancellation Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="whitespace-pre-wrap">{address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <Link href={`tel:+${phoneLink}`} className="hover:text-primary transition-colors">{phone}</Link>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <Link href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CarDictionary. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
