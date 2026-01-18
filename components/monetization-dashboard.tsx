"use client"

import { useState } from "react"
import { ArrowLeft, DollarSign, TrendingUp, Users, Gift, ShoppingBag, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface MonetizationDashboardProps {
  onClose: () => void
}

const earningsData = {
  totalEarnings: 45670,
  thisMonth: 8950,
  lastMonth: 7230,
  adRevenue: 3200,
  subscriptions: 4500,
  donations: 1250,
  shopSales: 0,
  pendingPayouts: 2340,
}

const analyticsData = {
  totalViews: 1250000,
  totalFollowers: 89500,
  engagementRate: 8.5,
  topVideo: "Mumbai Street Food Tour",
  topVideoViews: 234000,
}

const revenueStreams = [
  {
    id: "ads",
    name: "Ad Revenue",
    description: "Earnings from video and post advertisements",
    amount: 3200,
    growth: "+12%",
    icon: BarChart3,
    color: "text-green-600",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    description: "Monthly subscriber payments",
    amount: 4500,
    growth: "+25%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: "donations",
    name: "Fan Donations",
    description: "Tips and donations from fans",
    amount: 1250,
    growth: "+8%",
    icon: Gift,
    color: "text-purple-600",
  },
  {
    id: "shop",
    name: "Shop Sales",
    description: "Revenue from product sales",
    amount: 0,
    growth: "New",
    icon: ShoppingBag,
    color: "text-orange-600",
  },
]

export function MonetizationDashboard({ onClose }: MonetizationDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold">Creator Dashboard</h2>
        <Badge className="bg-green-500 text-white">Monetization Enabled</Badge>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="shop">Shop</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Earnings Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">₹{earningsData.totalEarnings.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">₹{earningsData.thisMonth.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {(((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100).toFixed(1)}%
                    increase from last month
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Streams */}
            <div className="space-y-4">
              <h3 className="font-semibold">Revenue Streams</h3>
              {revenueStreams.map((stream) => {
                const Icon = stream.icon
                return (
                  <Card key={stream.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${stream.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{stream.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{stream.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{stream.amount.toLocaleString()}</p>
                          <Badge variant="secondary" className="text-xs">
                            {stream.growth}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Boost Post Performance
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Subscriptions
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Set Up Shop
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{analyticsData.totalViews.toLocaleString()}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Total Views</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {analyticsData.totalFollowers.toLocaleString()}
                    </p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Followers</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement Rate</span>
                      <span>{analyticsData.engagementRate}%</span>
                    </div>
                    <Progress value={analyticsData.engagementRate * 10} className="h-2" />
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-medium text-sm">Top Performing Content</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{analyticsData.topVideo}</p>
                    <p className="text-xs text-gray-500">{analyticsData.topVideoViews.toLocaleString()} views</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audience Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Top Locations</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mumbai, India</span>
                        <span>35%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delhi, India</span>
                        <span>22%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Bangalore, India</span>
                        <span>18%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Age Groups</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>18-24</span>
                        <span>45%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>25-34</span>
                        <span>35%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>35-44</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-6 mt-6">
            {/* Payout Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Payout Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div>
                    <p className="font-medium">Pending Payout</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Next payout on March 1st</p>
                  </div>
                  <p className="text-xl font-bold text-yellow-600">₹{earningsData.pendingPayouts.toLocaleString()}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Payout History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm p-2 border rounded">
                      <span>February 2024</span>
                      <span className="text-green-600">₹7,230</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 border rounded">
                      <span>January 2024</span>
                      <span className="text-green-600">₹6,890</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 border rounded">
                      <span>December 2023</span>
                      <span className="text-green-600">₹5,450</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Update Payment Method</Button>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
              <CardHeader>
                <CardTitle className="text-orange-800 dark:text-orange-200">Tax Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                  As per Indian tax laws, TDS will be deducted from your earnings if applicable.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Gross Earnings (This Month)</span>
                    <span>₹8,950</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TDS Deducted</span>
                    <span>₹895</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Net Payout</span>
                    <span>₹8,055</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3 bg-transparent">
                  Download TDS Certificate
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="space-y-6 mt-6">
            {/* Shop Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Popo Shop</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Set Up Your Shop</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Start selling products directly to your followers. From merchandise to digital products, monetize
                    your content with integrated e-commerce.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">Create Your Shop</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Shop Features */}
            <Card>
              <CardHeader>
                <CardTitle>Shop Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Integrated payment processing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Inventory management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Order tracking & fulfillment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Digital product delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Analytics & insights</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
