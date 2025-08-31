"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { appSidebarData } from "@/data/admin/app-sidebar-data"
import Link from "next/link"
import { AnimatedCoinImage } from "../animated-coin.image"
import { NavMain } from "./nav-main"
import { NavLomba } from "./nav-lomba"
import { NavLainnya } from "./nav-lainnya"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { authClient } from "@/lib/auth-client"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = authClient.useSession()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin">
                <AnimatedCoinImage src="/images/brand-logo.png" alt="Valter 25" height={30} width={30} />
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <span className="text-base font-semibold group-data-[collapsible=icon]:hidden">Valter 25</span>
                <div className="absolute top-0 right-10 w-5 h-5 bg-yellow-300 rounded-full animate-ping opacity-40 delay-75"></div>
                <div className="absolute bottom-15 right-25 w-5 h-5 bg-purple-300 rounded-full animate-ping opacity-40 delay-700"></div>
                <div className="absolute top-20 right-40 w-5 h-5 bg-yellow-300 rounded-full animate-ping opacity-40 delay-100"></div>
                <div className="absolute top-30 right-30 w-5 h-5 bg-amber-300 rounded-full animate-ping opacity-40 delay-500"></div>
                <div className="absolute top-15 right-10 w-10 h-10 bg-red-300 rounded-full animate-ping opacity-40 delay-150"></div>
                <div className="absolute top-1/2 right-40 w-5 h-5 bg-yellow-300 rounded-full animate-ping opacity-40 delay-300"></div>
                <div className="absolute top-1/2 right-30 w-10 h-10 bg-amber-300 rounded-full animate-ping opacity-40 delay-500"></div>
                <div className="absolute top-1/2 -left-0 w-10 h-10 bg-red-300 rounded-full animate-ping opacity-40 delay-initial"></div>
                <div className="absolute top-1/2 -left-5 w-3 h-3 bg-sku-300 rounded-full animate-pulse opacity-40 delay-1000"></div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavLomba />
        {(data?.user.divisi === "superadmin") && (
          <>

            <NavLainnya />
            <NavSecondary items={appSidebarData.navSecondary} className="mt-auto" />

          </>
        )}

      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
