import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

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
