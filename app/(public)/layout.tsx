import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { getPlatformSettings } from "@/lib/actions/settings.actions";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getPlatformSettings();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* GIANT RED DEBUG BANNER */}
      <div className="bg-red-600 text-white font-bold text-center py-2 text-xl z-50 shadow-lg shadow-red-500/50 sticky top-0">
        DEBUG MODE V2 - NEW DEPLOYMENT IS ACTIVE
      </div>
      <Navbar settings={settings} />
      <main className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
