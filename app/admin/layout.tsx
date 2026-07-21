import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <AdminLayoutClient>
        {children}
      </AdminLayoutClient>
    </AdminAuthGuard>
  );
}
