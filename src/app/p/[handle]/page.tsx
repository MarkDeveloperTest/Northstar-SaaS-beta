import type { Metadata } from "next";
import { PublicProfile } from "@/components/app/public-profile";

export const metadata: Metadata = {
  title: "Alex Morgan",
  description: "Published Northstar profile for Alex Morgan.",
};

export default function PublicProfilePage() {
  return <PublicProfile />;
}
