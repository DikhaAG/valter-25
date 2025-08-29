"use client"

import {
  IconBuildingEstate,
  IconHome,
  // IconDots,
  // IconFolder,
  // IconShare3,
  // IconTrash,
  IconSchool,
  IconUsers
} from "@tabler/icons-react"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

export function NavLainnya() {
  // const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin/prodi"}>
                <IconSchool />
                <span>Program Studi</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin/kelas"}>
                <IconHome />
                <span>Kelas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin/domisili"}>
                <IconBuildingEstate />
                <span>Domisili</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/admin/users"}>
                <IconUsers />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarMenu>
    </SidebarGroup>
  )
}
