import UserAnalytics from "@/components/modules/Admin/Analytics/UserAnalytics";
import RequestedParcelList from "@/components/modules/Admin/Parcel/RequestedParcelList";
import AllAdminList from "@/components/modules/Admin/User/AllAdmins";
import DeletedUserList from "@/components/modules/Admin/User/DeletedUser";
import AllUnauthorUserList from "@/components/modules/Admin/User/UnauthorUser";
import AllUserList from "@/components/modules/Admin/User/UserList";
import Parcels from "@/pages/Admin/Parcels";
import { ISidebarItem } from "@/types";
import { lazy } from "react";
import {
  BarChart3,
  Package,
  // PlusSquare,
  ClipboardList,
  Users,
  UserX,
  UserCheck,
  Shield,
  User,
  Contact,
} from "lucide-react";
import MyProfile from "@/pages/Sender/MyProfile";
import AllContactList from "@/components/modules/Admin/Contact/ContactList";
import Blogs from "@/components/modules/Blogs/Blogs";
import AddBlog from "@/components/modules/Blogs/AddBlog";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Parcel Management",
    items: [
      {
        title: "Analytics",
        url: "/analytics",
        component: Analytics,
        icon: BarChart3,
      },
      {
        title: "All Parcels",
        url: "/parcels",
        component: Parcels,
        icon: Package,
      },
      {
        title: "Requested",
        url: "/parcel/requested",
        component: RequestedParcelList,
        icon: ClipboardList,
      },
      // {
      //   title: "Add Parcel",
      //   url: "/parcel/create",
      //   component: Parcels,
      //   icon: PlusSquare,
      // },
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
      },
      {
        title: "Unverified User",
        url: "/user/unverified",
        component: AllUnauthorUserList,
        icon: UserCheck,
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
