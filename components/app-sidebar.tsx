import { FileText, Ban, Home, AlertCircle } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
    {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Claims",
    url: "claims",
    icon: FileText,
  },
  {
    title: "Denied Claims",
    url: "denial",
    icon: Ban,
  },
  {
    title: "Alert",
    url: "alert",
    icon: AlertCircle,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
         <SidebarGroupLabel className="flex items-center gap-2 text-lg font-bold mb-6">
  MAKAI RCM COPILOT
  <Image 
    height={24} 
    width={24} 
    src="/logo/makailogo.png" 
    alt="Makai logo"
  />
</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pl-4 text-xl">
              {items.map((item) => (
                <SidebarMenuItem className="text-2xl" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a className="text-lg" href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
