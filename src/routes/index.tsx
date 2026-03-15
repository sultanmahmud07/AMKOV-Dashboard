import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import UserDetails from "@/components/modules/Admin/User/UserDetails";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import Unauthorized from "@/pages/Unauthorized";
import { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import BlogDetails from "@/components/modules/Blogs/BlogDetails";
import Analytics from "@/pages/Analytics/Analytics";
import EditBlog from "@/components/modules/Blogs/EditBlog/EditBlog";

export const router = createBrowserRouter([
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/",
    children: [
      {
        Component: Analytics,
        index: true,
      },
      ...generateRoutes(adminSidebarItems),
      {
        Component: Register,
        path: "/register",
      },
      {
        path: "/news/view/:slug",
        Component: BlogDetails,
      },
      {
        path: "/news/edit/:slug",
        Component: EditBlog,
      },
      {
        path: "/user/:id",
        Component: UserDetails,
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },

]);
