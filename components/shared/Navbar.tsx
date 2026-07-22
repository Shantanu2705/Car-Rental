"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Car, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { PlatformSettings } from "@/lib/actions/settings.actions";
import { useAuth } from "@/components/providers/AuthProvider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function Navbar({ settings }: { settings?: PlatformSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  
  const whatsappLink = settings 
    ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}` 
    : "https://wa.me/919876543210";

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/watermark.png" alt="CarDictionary Logo" className="h-10 w-auto object-contain" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Car<span className="text-primary">Dictionary</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/routes" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Routes
            </Link>
            <Link href="/vehicles" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Vehicles
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Auth/Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Book on WhatsApp
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/admin/dashboard">
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => signOut(auth)}>
                  <LogOut className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/80 hover:text-primary transition-colors p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border/50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10">Home</Link>
            <Link href="/routes" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10">Routes</Link>
            <Link href="/vehicles" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10">Vehicles</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10">Contact</Link>
            <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
              <div className="flex justify-center mb-2"><ThemeToggle /></div>
              <Link href={whatsappLink} target="_blank">
                <Button variant="outline" className="w-full justify-center border-primary/50 text-primary">Book on WhatsApp</Button>
              </Link>
              {user ? (
                <>
                  <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center gap-2"><User className="w-4 h-4" />Dashboard</Button>
                  </Link>
                  <Button variant="destructive" onClick={() => signOut(auth)} className="w-full gap-2"><LogOut className="w-4 h-4" />Sign Out</Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">Log In</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
