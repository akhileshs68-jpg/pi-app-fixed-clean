"use client"

import { useState } from "react"
import { Settings, Grid, Tag, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const userPosts = [
  { id: "1", image: "/placeholder.svg?height=200&width=200", likes: "1.2K" },
  { id: "2", image: "/placeholder.svg?height=200&width=200", likes: "856" },
  { id: "3", image: "/placeholder.svg?height=200&width=200", likes: "2.1K" },
  { id: "4", image: "/placeholder.svg?height=200&width=200", likes: "1.8K" },
  { id: "5", image: "/placeholder.svg?height=200&width=200", likes: "945" },
  { id: "6", image: "/placeholder.svg?height=200&width=200", likes: "634" },
]

const highlights = [
  { id: "1", title: "Travel", cover: "/placeholder.svg?height=60&width=60" },
  { id: "2", title: "Food", cover: "/placeholder.svg?height=60&width=60" },
  { id: "3", title: "Friends", cover: "/placeholder.svg?height=60&width=60" },
  { id: "4", title: "Work", cover: "/placeholder.svg?height=60&width=60" },
]

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="pb-20">
      {/* Profile Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">your_username</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-around text-center">
              <div>
                <div className="font-semibold">127</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div>
                <div className="font-semibold">1,234</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div>
                <div className="font-semibold">567</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <h3 className="font-semibold">Your Name</h3>
          <p className="text-sm text-gray-600 mt-1">
            📸 Photography enthusiast
            <br />🌍 Travel lover
            <br />📍 Mumbai, India
            <br />
            <span className="text-blue-600">www.yourwebsite.com</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-4">
          <Button variant="outline" className="flex-1 bg-transparent">
            Edit Profile
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Share Profile
          </Button>
        </div>

        {/* Story Highlights */}
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide mb-4">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center space-y-1 min-w-0">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 p-0.5">
                <img
                  src={highlight.cover || "/placeholder.svg"}
                  alt={highlight.title}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-600 truncate w-16 text-center">{highlight.title}</span>
            </div>
          ))}
          <div className="flex flex-col items-center space-y-1 min-w-0">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-xs text-gray-600">New</span>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 border-t border-gray-200">
          <TabsTrigger value="posts" className="flex items-center space-x-1">
            <Grid className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="reels" className="flex items-center space-x-1">
            <span className="text-sm">📹</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center space-x-1">
            <Tag className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-0">
          <div className="grid grid-cols-3 gap-1">
            {userPosts.map((post) => (
              <div key={post.id} className="relative aspect-square">
                <img src={post.image || "/placeholder.svg"} alt="User post" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs bg-black bg-opacity-50 text-white">
                    ❤️ {post.likes}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reels" className="mt-0">
          <div className="grid grid-cols-3 gap-1">
            {userPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="relative aspect-square">
                <img src={post.image || "/placeholder.svg"} alt="User reel" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <span className="text-white text-lg">📹</span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="text-xs bg-black bg-opacity-50 text-white">
                    👁️ {post.likes}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tagged" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12">
            <Tag className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600 text-center">No tagged posts yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
