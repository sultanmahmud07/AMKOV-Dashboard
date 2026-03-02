import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api";
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
import { Package, CheckCircle2, Truck, Clock } from "lucide-react";
import RecentParcelForOverview from "./RecentParcelForOverview";
import AnalyticsSkeleton from "../../loader/Receiver/AnalyticsSkeleton";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

const AdminAnalytics = () => {
  const { data: parcels = [], isLoading } = useGetAllParcelsQuery(undefined);
  if(isLoading){
      return(<AnalyticsSkeleton></AnalyticsSkeleton>)
  }
  // Summary counts
  const totalParcels = parcels?.data?.length;
  const delivered = parcels?.data?.filter((p: any) => p.status === "DELIVERED").length;
  const inTransit = parcels?.data?.filter(
    (p: any) => p.status === "IN_TRANSIT" || p.status === "DISPATCHED"
  ).length;
  const pending = parcels?.data?.filter(
    (p: any) => p.status === "REQUESTED" || p.status === "APPROVED"
  ).length;
  const canceled = parcels?.data?.filter((p: any) => p.status === "CANCELED").length;

  // Pie chart data
  const statusData = [
    { name: "Delivered", value: delivered },
    { name: "In Transit", value: inTransit },
    { name: "Pending", value: pending },
    { name: "Canceled", value: canceled },
  ];

  // Bar chart data (Monthly shipments)
  const monthlyData = parcels?.data?.reduce((acc: any, parcel: any) => {
    const month = new Date(parcel.createdAt).toLocaleString("default", { month: "short" });
    const found = acc.find((item: any) => item.month === month);
    if (found) {
      found.count += 1;
    } else {
      acc.push({ month, count: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="md:px-4 space-y-5">
      <h1 className="text-2xl md:text-3xl font-bold">📊 Admin Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Parcels */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Parcels</CardTitle>
            <Package className="h-6 w-6 text-gray-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalParcels}</p>
          </CardContent>
        </Card>

        {/* Delivered */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Delivered</CardTitle>
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{delivered}</p>
          </CardContent>
        </Card>

        {/* In Transit */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>In Transit</CardTitle>
            <Truck className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{inTransit}</p>
          </CardContent>
        </Card>

        {/* Pending + Canceled */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending / Canceled</CardTitle>
            <Clock className="h-6 w-6 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{pending + canceled}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Status Distribution</CardTitle>
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
            <CardTitle>Monthly Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <RecentParcelForOverview></RecentParcelForOverview>
    </div>
  );
};

export default AdminAnalytics;
