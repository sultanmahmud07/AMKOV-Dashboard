
import AllAdminList from "@/components/modules/User/AllAdmins";
import AllUserList from "@/components/modules/User/UserList";
import { ISidebarItem } from "@/types";
import {
  BarChart3,
  PlusSquare,
  Users,
  Shield,
  User,
  Contact,
  ListCheck,
  Camera,
  Newspaper,
  NotebookPen,
} from "lucide-react";
import AllContactList from "@/components/modules/Contact/ContactList";
import Blogs from "@/components/modules/Blogs/Blogs";
import AddBlog from "@/components/modules/Blogs/AddBlog";
import Analytics from "@/pages/Analytics/Analytics";
import Products from "@/pages/Product/Products";
import AddProduct from "@/pages/Product/AddProduct";
import AllCategories from "@/pages/Category/AllCategories";
import MyProfile from "@/pages/Profile/MyProfile";


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
        icon: Camera,
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
        icon: ListCheck,
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        title: "All News",
        url: "/news",
        component: Blogs,
        icon: Newspaper,
      },
      {
        title: "Add News",
        url: "/new/create",
        component: AddBlog,
        icon: NotebookPen,
      },
    ],
  },
  {
    title: "Control Accessibility",
    items: [
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
  {
    title: "User Management",
    items: [
      {
        title: "All User",
        url: "/user/all",
        component: AllUserList,
        icon: Users,
      },
      {
        title: "Manage Admin",
        url: "/admin",
        component: AllAdminList,
        icon: Shield,
      },
    ],
  },
];
