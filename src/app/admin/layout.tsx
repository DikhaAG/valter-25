import React from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SiteHeader } from "@/components/admin/site-header";

interface Props {
  children: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    "admin"
  )
}
