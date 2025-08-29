"use client"

import * as React from "react"
import {
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavLainnya } from "@/components/nav-lainnya"
import { NavLomba } from "@/components/nav-lomba"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
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
import { AnimatedCoinImage } from "./animated-coin.image"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
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
                <span className="text-base font-semibold">Valter 25</span>
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
        <NavLainnya />
        <NavSecondary items={appSidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={appSidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
