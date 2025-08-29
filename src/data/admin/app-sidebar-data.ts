import {
  // IconCamera,
  // IconChartBar,
  IconDashboard,
  IconDatabase,
  // IconFileAi,
  // IconFileDescription,
  // IconFileWord,
  // IconFolder,
  // IconHelp,
  // IconListDetails,
  IconReport,
  // IconSearch,
  IconSettings,
  // IconUsers,
} from "@tabler/icons-react"

export const appSidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
   ],
  navLomba: [
    {
      name: "Data Pendaftaran",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Utilities",
      url: "#",
      icon: IconReport,
    },
  ],
  navLainnya: [
    {
      name: "Data Pendaftaran",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Utilities",
      url: "#",
      icon: IconReport,
    },
  ],
}
