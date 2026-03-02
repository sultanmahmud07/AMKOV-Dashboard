import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Outlet } from "react-router";
import { ModeToggle } from "./ModeToggler";
import UserProfileMenu from "./UserProfileMenu";

export default function DashboardLayout() {
  const { data } = useUserInfoQuery(undefined);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex items-center gap-2 md:pr-3">
            <ModeToggle />
            <span className="uppercase">{data?.data?.name}</span>
            {
              data?.data?.name &&
              <UserProfileMenu userInfo={data?.data} />
            }
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
