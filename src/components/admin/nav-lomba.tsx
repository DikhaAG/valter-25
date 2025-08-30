"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

export function NavLomba() {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Lomba</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin/web"}>
                <Image src={"/images/game.png"} alt="E-sport" height={20} width={20} />
                <span>E-sport</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin/video-design"}>
                <Image src={"/images/vid.png"} alt="Video Campaign" height={20} width={20} />
                <span>Video Campaign</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin/web-design"}>
                <Image src={"/images/uiuix.png"} alt="Web Design" height={20} width={20} />
                <span>Web Design</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarMenu>
    </SidebarGroup>
  )
}
