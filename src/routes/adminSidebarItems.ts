import UserAnalytics from "@/components/modules/Admin/Analytics/UserAnalytics";
import AllAdminList from "@/components/modules/Admin/User/AllAdmins";
import DeletedUserList from "@/components/modules/Admin/User/DeletedUser";
import AllUserList from "@/components/modules/Admin/User/UserList";
import { ISidebarItem } from "@/types";
import {
  BarChart3,
  Package,
  PlusSquare,
  Users,
  UserX,
  Shield,
  User,
  Contact,
} from "lucide-react";
import MyProfile from "@/pages/Sender/MyProfile";
import AllContactList from "@/components/modules/Admin/Contact/ContactList";
import Blogs from "@/components/modules/Blogs/Blogs";
import AddBlog from "@/components/modules/Blogs/AddBlog";
import Analytics from "@/pages/Analytics/Analytics";
import Products from "@/pages/Product/Products";
import AddProduct from "@/pages/Product/AddProduct";
import AllCategories from "@/pages/Category/AllCategories";


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Product Management",
    items: [
      {
        title: "Analytics",
        url: "/analytics",
        component: Analytics,
        icon: BarChart3,
      },
      {
        title: "All Products",
        url: "/products",
        component: Products,
        icon: Package,
      },
      {
        title: "Add Product",
        url: "/product/create",
        component: AddProduct,
        icon: PlusSquare,
      },
      {
        title: "All Categories",
        url: "/categories",
        component: AllCategories,
        icon: Package,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Analytics",
        url: "/user/analytics",
        component: UserAnalytics,
        icon: BarChart3,
      },
      {
        title: "All User",
        url: "/user/all",
        component: AllUserList,
        icon: Users,
      },
      {
        title: "Deleted User",
        url: "/user/deleted",
        component: DeletedUserList,
        icon: UserX,
      }
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        title: "All News",
        url: "/news",
        component: Blogs,
        icon: BarChart3,
      },
      {
        title: "Add News",
        url: "/news/create",
        component: AddBlog,
        icon: Users,
      },
    ],
  },
  {
    title: "Control Accessibility",
    items: [
      {
        title: "Manage Admin",
        url: "/admin",
        component: AllAdminList,
        icon: Shield,
      },
      {
        title: "My Profile",
        url: "/profile",
        component: MyProfile,
        icon: User,
      },
      {
        title: "Contact Queries",
        url: "/contact",
        component: AllContactList,
        icon: Contact,
      },
    ],
  },
];
