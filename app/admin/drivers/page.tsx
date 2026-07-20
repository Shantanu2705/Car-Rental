import Link from "next/link";
import { getDrivers } from "@/lib/actions/driver.actions";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function DriversPage() {
  const result = await getDrivers();
  const drivers = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Drivers</h1>
          <p className="text-muted-foreground">Manage your driver personnel and assignments.</p>
        </div>
        <Link href="/admin/drivers/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Driver
          </Button>
        </Link>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No drivers found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              drivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>
                    <Badge variant={driver.status === "ACTIVE" ? "default" : "secondary"}>
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      driver.availability === "AVAILABLE" ? "text-green-500 border-green-500/50" : 
                      driver.availability === "ON_TRIP" ? "text-blue-500 border-blue-500/50" : "text-muted-foreground"
                    }>
                      {(driver.availability || "AVAILABLE").replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/drivers/${driver.id}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
