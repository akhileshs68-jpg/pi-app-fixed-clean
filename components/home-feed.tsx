"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const posts = [
  {
    id: "1",
    username: "john_doe",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Mumbai, India",
    image: "/placeholder.svg?height=400&width=400",
    likes: 1234,
    caption: "Beautiful sunset at the beach! 🌅 #sunset #beach #mumbai",
    comments: 89,
    timeAgo: "2h",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "2",
    username: "jane_smith",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Delhi, India",
    image: "/placeholder.svg?height=400&width=400",
    likes: 856,
    caption: "Homemade butter chicken! Recipe in my bio 👨‍🍳 #food #indian #cooking",
    comments: 45,
    timeAgo: "4h",
    isLiked: true,
    isSaved: false,
  },
  {
    id: "3",
    username: "travel_guru",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Goa, India",
    image: "/placeholder.svg?height=400&width=400",
    likes: 2156,
    caption: "Paradise found! 🏝️ Can't wait to explore more of Goa #travel #goa #paradise",
    comments: 156,
    timeAgo: "6h",
    isLiked: false,
    isSaved: true,
  },
]

export function HomeFeed() {
  const [postsState, setPostsState] = useState(posts)

  const toggleLike = (postId: string) => {
    setPostsState((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const toggleSave = (postId: string) => {
    setPostsState((prev) => prev.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)))
  }

  return (
    <div className="space-y-0">
      {postsState.map((post) => (
        <Card key={post.id} className="border-0 border-b border-gray-200 dark:border-gray-700 rounded-none">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.username} />
                <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{post.username}</p>
                {post.location && <p className="text-xs text-gray-500">{post.location}</p>}
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Post Image */}
          <div className="relative">
            <img
              src={post.image || "/placeholder.svg"}
              alt="Post content"
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="p-0" onClick={() => toggleLike(post.id)}>
                  <Heart className={`w-6 h-6 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="p-0">
                  <MessageCircle className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="sm" className="p-0">
                  <Send className="w-6 h-6" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="p-0" onClick={() => toggleSave(post.id)}>
                <Bookmark className={`w-6 h-6 ${post.isSaved ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Likes */}
            <p className="font-semibold text-sm mb-2">{post.likes.toLocaleString()} likes</p>

            {/* Caption */}
            <div className="text-sm mb-2">
              <span className="font-semibold mr-2">{post.username}</span>
              <span>{post.caption}</span>
            </div>

            {/* Comments */}
            {post.comments > 0 && <p className="text-sm text-gray-500 mb-2">View all {post.comments} comments</p>}

            {/* Time */}
            <p className="text-xs text-gray-400 uppercase">{post.timeAgo} ago</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
