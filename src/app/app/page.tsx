import type { Metadata } from "next";
import { SaasWorkspace } from "@/components/app/workspace";

export const metadata: Metadata = {
  title: "Workspace",
};

export default function AppPage() {
  return <SaasWorkspace />;
}
