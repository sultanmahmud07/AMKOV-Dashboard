import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import logoLight from "../assets/images/logo/logo-light.png";
import logoDark from "../assets/images/logo/logo-dark.png";
import { Link, NavLink } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/">
          {/* Logo for Light Mode (Hidden in Dark Mode) */}
          <img
            src={logoLight}
            alt="DropX Logo"
            width={200}
            height={100}
            className="w-40 block dark:hidden"
          />

          {/* Logo for Dark Mode (Hidden in Light Mode) */}
          <img
            src={logoDark}
            alt="DropX Logo"
            width={200}
            height={100}
            className="w-40 hidden dark:block"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild>
                      <NavLink className="flex items-center gap-2 uppercase" to={subItem.url}>
                        {/* Show icon if exists */}
                        {subItem.icon && <subItem.icon />}
                        {subItem.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
