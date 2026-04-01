/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { Package, LayoutGrid, MessageSquare, Users, AlertTriangle, TrendingUp } from "lucide-react";
import AnalyticsSkeleton from "../loader/Receiver/AnalyticsSkeleton";
import RecentProductForOverview from "./RecentProductForOverview";
import { useGetDashboardAnalyticsQuery } from "@/redux/features/product/product.api"; 

const AdminAnalytics = () => {
  const { data: response, isLoading } = useGetDashboardAnalyticsQuery(undefined);
  
  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  // Safely extract data from your nested response structure
  const stats = response?.data?.data;
  
  if (!stats) return null;

  const { summary, counts, inquirySeries, alerts } = stats;

  // Pie chart data for Inquiry Breakdown
  const inquiryDistribution = [
    { name: "Product Inquiries", value: counts.inquiries.product },
    { name: "General Inquiries", value: counts.inquiries.general },
  ];
  const PIE_COLORS = ["#1BAE70", "#3B82F6"];

  // Format the date for the X-Axis on the Area Chart
  const formattedSeriesData = inquirySeries.map((item: any) => ({
    ...item,
    formattedDate: format(parseISO(item.date), "MMM dd")
  }));

  return (
    <div className="w-full space-y-6 md:p-4">
      
      {/* Header */}
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-[#1BAE70]" />
          Analytics Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Monitor your store's performance, inquiries, and inventory health.
        </p>
      </div>

      {/* ================= LOW STOCK ALERTS ================= */}
      {alerts?.lowStockProducts?.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-2xl p-4 flex items-start md:items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5 md:mt-0" />
          <div>
            <h4 className="text-amber-800 dark:text-amber-400 font-semibold text-sm md:text-base">Low Stock Alert</h4>
            <p className="text-amber-700 dark:text-amber-500 text-xs md:text-sm mt-0.5">
              You have {alerts.lowStockProducts.length} product(s) running low on inventory. Please check the variations.
            </p>
          </div>
        </div>
      )}

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Products */}
        <Card className="border-gray-100 dark:border-zinc-800/60 shadow-sm rounded-2xl bg-white dark:bg-zinc-950 transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</CardTitle>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{summary.totalProducts}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{counts.newProductsLast30} in last 30 days
            </p>
          </CardContent>
        </Card>

        {/* Total Categories */}
        <Card className="border-gray-100 dark:border-zinc-800/60 shadow-sm rounded-2xl bg-white dark:bg-zinc-950 transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</CardTitle>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <LayoutGrid className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{summary.totalCategories}</p>
            <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium mt-1">
              Active product categories
            </p>
          </CardContent>
        </Card>

        {/* Total Inquiries */}
        <Card className="border-gray-100 dark:border-zinc-800/60 shadow-sm rounded-2xl bg-white dark:bg-zinc-950 transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer Inquiries</CardTitle>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{summary.totalInquiries}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{counts.newInquiriesLast30} new messages
            </p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="border-gray-100 dark:border-zinc-800/60 shadow-sm rounded-2xl bg-white dark:bg-zinc-950 transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</CardTitle>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{summary.totalUsers}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{counts.newUsersLast30} joined recently
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart: Inquiry Timeline */}
        <Card className="lg:col-span-2 border-gray-100 dark:border-zinc-800/60 shadow-sm rounded-2xl bg-white dark:bg-zinc-950">
          <CardHeader className="border-b border-gray-100 dark:border-zinc-800/50 pb-4">
            <CardTitle className="text-lg">Inquiry Volume (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1BAE70" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1BAE70" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                  <XAxis 
                    dataKey="formattedDate" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    minTickGap={30}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    name="Inquiries"
                    stroke="#1BAE70" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorInquiries)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Donut Chart: Inquiry Types */}
        <Card className="border-gray-100 dark:border-zinc-800/60 shadow-sm rounded-2xl bg-white dark:bg-zinc-950">
          <CardHeader className="border-b border-gray-100 dark:border-zinc-800/50 pb-4">
            <CardTitle className="text-lg">Inquiry Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inquiryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {inquiryDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1f2937', fontWeight: 500 }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      {/* Assuming RecentProductForOverview is designed to handle products/inquiries. 
          You can pass data.recent to it if needed. */}
      <div className="pt-4">
        <RecentProductForOverview />
      </div>
      
    </div>
  );
};

export default AdminAnalytics;