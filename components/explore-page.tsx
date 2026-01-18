"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const trendingHashtags = [
  "#PopoChallenge",
  "#IndianFestival",
  "#MumbaiLife",
  "#FoodieLife",
  "#TravelIndia",
  "#BollywoodStyle",
  "#TechNews",
  "#Fitness",
]

const exploreContent = [
  { id: "1", image: "/placeholder.svg?height=200&width=200", likes: "1.2K", type: "image" },
  { id: "2", image: "/placeholder.svg?height=200&width=200", likes: "856", type: "image" },
  { id: "3", image: "/placeholder.svg?height=200&width=200", likes: "2.1K", type: "reel" },
  { id: "4", image: "/placeholder.svg?height=200&width=200", likes: "634", type: "image" },
  { id: "5", image: "/placeholder.svg?height=200&width=200", likes: "1.8K", type: "image" },
  { id: "6", image: "/placeholder.svg?height=200&width=200", likes: "945", type: "reel" },
  { id: "7", image: "/placeholder.svg?height=200&width=200", likes: "1.5K", type: "image" },
  { id: "8", image: "/placeholder.svg?height=200&width=200", likes: "723", type: "image" },
  { id: "9", image: "/placeholder.svg?height=200&width=200", likes: "1.1K", type: "reel" },
]

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="pb-20">
      {/* Search Bar */}
      <div className="sticky top-16 bg-white dark:bg-gray-900 z-40 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users, hashtags, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="p-4">
        <h3 className="font-semibold mb-3">Trending in India</h3>
        <div className="flex flex-wrap gap-2">
          {trendingHashtags.map((hashtag) => (
            <Badge key={hashtag} variant="secondary" className="text-xs">
              {hashtag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1">
        {exploreContent.map((item) => (
          <div key={item.id} className="relative aspect-square">
            <img src={item.image || "/placeholder.svg"} alt="Explore content" className="w-full h-full object-cover" />
            {item.type === "reel" && (
              <div className="absolute top-2 right-2">
                <div className="bg-black bg-opacity-50 rounded px-1 py-0.5">
                  <span className="text-white text-xs">📹</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-2 left-2">
              <div className="bg-black bg-opacity-50 rounded px-2 py-1">
                <span className="text-white text-xs">❤️ {item.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
