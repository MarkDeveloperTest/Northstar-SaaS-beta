import type { Metadata } from "next";
import { PublicProfile } from "@/components/app/public-profile";

export const metadata: Metadata = {
  title: "Alex Morgan",
  description: "Published Northstar profile for Alex Morgan.",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ handle: "alex" }];
}

export default function PublicProfilePage() {
  return <PublicProfile />;
}
