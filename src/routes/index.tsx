import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import UserDetails from "@/components/modules/User/UserDetails";
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
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import CategoryDetailPage from "@/pages/Category/CategoryDetails";
import EditCategory from "@/pages/Category/EditCategory";
import AddCategory from "@/pages/Category/AddCategory";
import EditProduct from "@/pages/Product/EditProduct";
import ProductDetails from "@/pages/Product/ProductDetails";
import AddAdmin from "@/components/modules/Admin/AddAdmin";
import ContactDetails from "@/components/modules/Contact/ContactDetails";

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
        Component: AddAdmin,
        path: "/admin/invite",
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
        path: "/category/create",
        Component: AddCategory,
      },
      {
        path: "/category/view/:slug",
        Component: CategoryDetailPage,
      },
      {
        path: "/category/edit/:slug",
        Component: EditCategory,
      },
      {
        path: "/product/view/:slug",
        Component: ProductDetails,
      },
      {
        path: "/product/edit/:slug",
        Component: EditProduct,
      },
      {
        path: "/user/:id",
        Component: UserDetails,
      },
      {
        path: "/contact/:id",
        Component: ContactDetails,
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: ForgotPassword,
    path: "/forgot-password",
  },
  {
    Component: ResetPassword,
    path: "/reset-password",
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
