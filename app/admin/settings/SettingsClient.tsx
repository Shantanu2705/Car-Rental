"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { PlatformSettings, updatePlatformSettings, updateAdminCredentials } from "@/lib/actions/settings.actions";
import { useAuth } from "@/components/providers/AuthProvider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function SettingsClient({ initialSettings }: { initialSettings: PlatformSettings }) {
  const { user } = useAuth();
  
  // Platform Settings State
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Admin Credentials State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credLoading, setCredLoading] = useState(false);
  const [credError, setCredError] = useState("");

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePlatformSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setCredLoading(true);
    setCredError("");

    try {
      await updateAdminCredentials(user.uid, email || undefined, password || undefined);
      
      // Force sign out so user logs in with new credentials
      await signOut(auth);
    } catch (error: any) {
      console.error(error);
      setCredError(error.message || "Failed to update credentials");
      setCredLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update the contact details shown to customers globally.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <label className="text-sm font-medium">WhatsApp Booking Number</label>
              <Input 
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <Input 
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Office Address</label>
              <Input 
                value={settings.officeAddress}
                onChange={(e) => setSettings({...settings, officeAddress: e.target.value})}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {success ? "Saved!" : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Admin Credentials</CardTitle>
          <CardDescription>
            Change your admin email and password. You will be logged out upon success.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveCredentials} className="space-y-4 max-w-xl">
            {credError && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
                {credError}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">New Email Address (Optional)</label>
              <Input 
                type="email"
                placeholder="Leave blank to keep current"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">New Password (Optional)</label>
              <Input 
                type="password"
                placeholder="Leave blank to keep current"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
            </div>

            <Button variant="destructive" type="submit" disabled={credLoading || (!email && !password)}>
              {credLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Credentials
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
