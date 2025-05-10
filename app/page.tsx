"use client"

import { useState, Suspense, lazy } from "react"
import { BriefcaseIcon, CalendarIcon, CheckCircle2, Clock, ThumbsDown, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockData, getApplicationStats } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"

// Lazy load chart components
const BarChart = lazy(() => import("recharts").then(mod => ({ default: mod.BarChart })))
const Bar = lazy(() => import("recharts").then(mod => ({ default: mod.Bar })))
const LineChart = lazy(() => import("recharts").then(mod => ({ default: mod.LineChart })))
const Line = lazy(() => import("recharts").then(mod => ({ default: mod.Line })))
const PieChart = lazy(() => import("recharts").then(mod => ({ default: mod.PieChart })))
const Pie = lazy(() => import("recharts").then(mod => ({ default: mod.Pie })))
const Cell = lazy(() => import("recharts").then(mod => ({ default: mod.Cell })))
const XAxis = lazy(() => import("recharts").then(mod => ({ default: mod.XAxis })))
const YAxis = lazy(() => import("recharts").then(mod => ({ default: mod.YAxis })))
const CartesianGrid = lazy(() => import("recharts").then(mod => ({ default: mod.CartesianGrid })))
const Tooltip = lazy(() => import("recharts").then(mod => ({ default: mod.Tooltip })))
const Legend = lazy(() => import("recharts").then(mod => ({ default: mod.Legend })))

// Chart loading fallback
const ChartSkeleton = () => (
  <div className="w-full h-[300px] flex items-center justify-center">
    <Skeleton className="w-full h-full" />
  </div>
)

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("all")
  const stats = getApplicationStats(mockData)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  const pieData = [
    { name: "Applied", value: stats.applied },
    { name: "Interview", value: stats.interviews },
    { name: "Offer", value: stats.offers },
    { name: "Rejected", value: stats.rejections },
    { name: "On Hold", value: stats.onHold },
  ]

  const timeData = [
    { name: "Jan", applications: 4 },
    { name: "Feb", applications: 7 },
    { name: "Mar", applications: 5 },
    { name: "Apr", applications: 10 },
    { name: "May", applications: 8 },
    { name: "Jun", applications: 12 },
  ]

  const companyData = [
    { name: "Google", applications: 3 },
    { name: "Amazon", applications: 2 },
    { name: "Microsoft", applications: 4 },
    { name: "Apple", applications: 1 },
    { name: "Meta", applications: 2 },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejections</CardTitle>
            <ThumbsDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejections}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Applications Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<ChartSkeleton />}>
              <ChartContainer
                config={{
                  applications: {
                    label: "Applications",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="aspect-[4/3]"
              >
                <LineChart
                  data={timeData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="var(--color-applications)"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ChartContainer>
            </Suspense>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<ChartSkeleton />}>
              <ChartContainer
                config={{
                  applied: {
                    label: "Applied",
                    color: "#0088FE",
                  },
                  interview: {
                    label: "Interview",
                    color: "#00C49F",
                  },
                  offer: {
                    label: "Offer",
                    color: "#FFBB28",
                  },
                  rejected: {
                    label: "Rejected",
                    color: "#FF8042",
                  },
                  onHold: {
                    label: "On Hold",
                    color: "#8884d8",
                  },
                }}
                className="aspect-[4/3]"
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest application updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.slice(0, 5).map((app, i) => (
              <div key={i} className="flex items-center">
                <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  {app.status === "Applied" && <Clock className="h-5 w-5 text-primary" />}
                  {app.status === "Interview" && <CalendarIcon className="h-5 w-5 text-amber-500" />}
                  {app.status === "Offer" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {app.status === "Rejected" && <ThumbsDown className="h-5 w-5 text-red-500" />}
                  {app.status === "On Hold" && <Clock className="h-5 w-5 text-gray-500" />}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {app.company} - {app.position}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status changed to <span className="font-medium">{app.status}</span>
                  </p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {new Date(app.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
