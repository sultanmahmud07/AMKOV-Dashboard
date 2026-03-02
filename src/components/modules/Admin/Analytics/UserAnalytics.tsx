import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// ✅ lucide-react icons
import { Users, UserCheck, UserX, UserMinus } from "lucide-react";
import { useGetAllUserQuery } from "@/redux/features/user/user.api";
import AnalyticsSkeleton from "../../loader/Receiver/AnalyticsSkeleton";

const COLORS = ["#10B981", "#F59E0B", "#3B82F6", "#EF4444", "#8B5CF6"];

const UserAnalytics = () => {
  const { data, isLoading } = useGetAllUserQuery(undefined);
    if(isLoading){
      return(<AnalyticsSkeleton></AnalyticsSkeleton>)
  }
const users = data?.data;
  // Summary counts
  const totalUsers = users.length;
  const verifiedUsers = users.filter((u: any) => u.isVerified).length;
  const unverifiedUsers = users.filter((u: any) => !u.isVerified).length;
  const activeUsers = users.filter((u: any) => u.isActive === "ACTIVE").length;
  const blockedUsers = users.filter((u: any) => u.isActive === "BLOCKED").length;
  const deletedUsers = users.filter((u: any) => u.isDeleted).length;

  // Pie chart data
  const statusData = [
    { name: "Verified", value: verifiedUsers },
    { name: "Unverified", value: unverifiedUsers },
    { name: "Active", value: activeUsers },
    { name: "Blocked", value: blockedUsers },
    { name: "Deleted", value: deletedUsers },
  ];

  // Bar chart data (Users by Role)
  const roleData = users.reduce((acc: any[], user: any) => {
    const role = user.role;
    const found = acc.find((item) => item.role === role);
    if (found) {
      found.count += 1;
    } else {
      acc.push({ role, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="md:px-4 space-y-5">
      <h1 className="text-2xl md:text-3xl font-bold">👥 User Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Users</CardTitle>
            <Users className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Verified</CardTitle>
            <UserCheck className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{verifiedUsers}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Unverified</CardTitle>
            <UserMinus className="h-6 w-6 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{unverifiedUsers}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Blocked</CardTitle>
            <UserX className="h-6 w-6 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{blockedUsers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAnalytics;
