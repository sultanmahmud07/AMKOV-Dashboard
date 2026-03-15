import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Outlet } from "react-router";
import DashboardHeader from "./DashboardHeader"; // Import your new Header

export default function DashboardLayout() {
  const { data } = useUserInfoQuery(undefined);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        
        {/* Separated Header Component */}
        <DashboardHeader userInfo={data?.data} />

        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}