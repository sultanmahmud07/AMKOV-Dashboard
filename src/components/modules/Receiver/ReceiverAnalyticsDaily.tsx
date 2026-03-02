import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Package, CheckCircle2, Truck, Clock } from "lucide-react";
import { useGetReceiverAnalyticsQuery } from "@/redux/features/receiver/receiver.api";
import ReceiverRecentParcelList from "./ReceiverRecentParcelList";
import AnalyticsSkeleton from "../loader/Receiver/AnalyticsSkeleton";
const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

const ReceiverAnalytics = () => {
  const { data, isLoading } = useGetReceiverAnalyticsQuery(undefined);

  if (isLoading) return<AnalyticsSkeleton></AnalyticsSkeleton>

  console.log(data)
  const { totalParcels, delivered, inTransit, pending, canceled, dailyData } =
    data?.data || {};
  const statusData = [
    { name: "Delivered", value: delivered },
    { name: "In Transit", value: inTransit },
    { name: "Pending", value: pending },
    { name: "Canceled", value: canceled },
  ];

  const formattedDaily = dailyData?.map((d: any) => ({
    date: d.date, // already formatted as YYYY-MM-DD from backend
    count: d.count,
  }));

  return (
    <div className="md:px-4 px-3 space-y-5">
      <h1 className="text-2xl md:text-3xl font-bold">📦 Receiver Analytics</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Parcels</CardTitle>
            <Package className="h-6 w-6 text-gray-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalParcels}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Delivered</CardTitle>
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{delivered}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>In Transit</CardTitle>
            <Truck className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{inTransit}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Pending / Canceled</CardTitle>
            <Clock className="h-6 w-6 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{pending + canceled}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formattedDaily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <ReceiverRecentParcelList />
    </div>
  );
};

export default ReceiverAnalytics;
