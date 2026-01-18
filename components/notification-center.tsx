"use client"

import { useState } from "react"
import { ArrowLeft, Heart, MessageCircle, UserPlus, Video, Gift, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NotificationCenterProps {
  onClose: () => void
}

const notifications = [
  {
    id: "1",
    type: "like",
    user: "john_doe",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "liked your post",
    time: "2m ago",
    isRead: false,
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: "2",
    type: "comment",
    user: "jane_smith",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "commented on your video",
    time: "5m ago",
    isRead: false,
    icon: MessageCircle,
    color: "text-blue-500",
  },
  {
    id: "3",
    type: "follow",
    user: "travel_guru",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "started following you",
    time: "1h ago",
    isRead: true,
    icon: UserPlus,
    color: "text-green-500",
  },
  {
    id: "4",
    type: "live",
    user: "dance_queen",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "is live now",
    time: "2h ago",
    isRead: true,
    icon: Video,
    color: "text-purple-500",
  },
  {
    id: "5",
    type: "donation",
    user: "supporter123",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "sent you a donation",
    time: "3h ago",
    isRead: false,
    icon: Gift,
    color: "text-yellow-500",
  },
]

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (notificationId: string) => {
    setNotificationList((prev) =>
      prev.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const unreadCount = notificationList.filter((notif) => !notif.isRead).length

  const filteredNotifications = notificationList.filter((notif) => {
    if (activeTab === "all") return true
    if (activeTab === "interactions") return ["like", "comment"].includes(notif.type)
    if (activeTab === "follows") return notif.type === "follow"
    if (activeTab === "live") return notif.type === "live"
    return true
  })

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="font-semibold">Notifications</h2>
          {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount}</Badge>}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="interactions">Likes</TabsTrigger>
          <TabsTrigger value="follows">Follows</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-0">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Bell className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-center">No notifications yet</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-l-4 ${
                      notification.isRead ? "border-transparent" : "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={notification.avatar || "/placeholder.svg"} alt={notification.user} />
                      <AvatarFallback>{notification.user[0].toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-sm">{notification.user}</p>
                        <Icon className={`w-4 h-4 ${notification.color}`} />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>

                    {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
