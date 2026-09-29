import type { Metadata } from "next";
import { Shell } from "@/components/dashboard/Shell";

export const metadata: Metadata = {
  title: "Admin",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
