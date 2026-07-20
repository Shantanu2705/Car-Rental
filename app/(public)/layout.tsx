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
    <div className="flex flex-col min-h-screen">
      <Navbar settings={settings} />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
