import { getPlatformSettings } from "@/lib/actions/settings.actions";
import { SettingsClient } from "./SettingsClient";

export default async function AdminSettingsPage() {
  const settings = await getPlatformSettings();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
      </div>
      <SettingsClient initialSettings={settings} />
    </div>
  );
}
