"use client"

import { IconCirclePlusFilled, IconDashboard, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin"}>
                <IconDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="py-5">
              <Link href={"/admin/seminar"} className="relative py-4 overflow-hidden w-full transition-all duration-300 transform-gpu hover:-translate-y-1">
                
                  <Image src={"/images/guest-star.png"} alt="Seminar" height={20} width={20} />
                  <span>Seminar</span>
                  <div
                    className="absolute inset-0 z-0 rounded-lg animate-[goldBorder_3s_linear_infinite]"
                    style={{
                      background: 'linear-gradient(45deg, #FFD700, #FFA500, #212121, #FFD700, #FFA500)',
                      backgroundSize: '200% 100%', // Ukuran gradien yang lebih besar
                      mask: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
                      maskComposite: 'exclude',
                      padding: '3px',
                    }}
                  ></div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin/pelatihan"}>
                <Image src={"/images/training.png"} alt="Pelatihan" height={20} width={20} />
                <span>Pelatihan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarGroupContent>
    </SidebarGroup>
  )
}
