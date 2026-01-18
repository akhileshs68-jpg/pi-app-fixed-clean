"use client"

import { Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const stories = [
  { id: "your-story", username: "Your Story", avatar: "/placeholder.svg?height=60&width=60", isYourStory: true },
  { id: "1", username: "john_doe", avatar: "/placeholder.svg?height=60&width=60" },
  { id: "2", username: "jane_smith", avatar: "/placeholder.svg?height=60&width=60" },
  { id: "3", username: "travel_guru", avatar: "/placeholder.svg?height=60&width=60" },
  { id: "4", username: "foodie_life", avatar: "/placeholder.svg?height=60&width=60" },
  { id: "5", username: "tech_news", avatar: "/placeholder.svg?height=60&width=60" },
]

export function StoriesBar() {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 min-w-0">
            <div className="relative">
              <div
                className={`p-0.5 rounded-full ${story.isYourStory ? "bg-gray-300" : "bg-gradient-to-tr from-yellow-400 to-purple-600"}`}
              >
                <Avatar className="w-14 h-14 border-2 border-white">
                  <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.username} />
                  <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              {story.isYourStory && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate w-16 text-center">
              {story.isYourStory ? "Your Story" : story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
