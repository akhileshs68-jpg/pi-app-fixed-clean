"use client"

import { useState, useEffect } from "react"
import { Play, TrendingUp, Flame, Users, Search, Filter, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface VideoHubProps {
  onVideoPlay: (video: any) => void
}

const videoCategories = [
  { id: "all", name: "All", icon: "🎬" },
  { id: "food", name: "Food", icon: "🍛" },
  { id: "travel", name: "Travel", icon: "✈️" },
  { id: "music", name: "Music", icon: "🎵" },
  { id: "dance", name: "Dance", icon: "💃" },
  { id: "comedy", name: "Comedy", icon: "😂" },
  { id: "tech", name: "Tech", icon: "💻" },
  { id: "fitness", name: "Fitness", icon: "💪" },
  { id: "education", name: "Education", icon: "📚" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
]

const trendingVideos = [
  {
    id: "1",
    title: "Mumbai Street Food Adventure | Complete Guide",
    creator: "foodie_mumbai",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "12:45",
    views: "2.3M",
    likes: "156K",
    uploadTime: "2 days ago",
    category: "food",
    type: "long-form",
    isMonetized: true,
    earnings: "₹12,450",
  },
  {
    id: "2",
    title: "Quick Bollywood Dance Tutorial",
    creator: "dance_queen",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "0:45",
    views: "890K",
    likes: "67K",
    uploadTime: "1 day ago",
    category: "dance",
    type: "short-form",
    isMonetized: true,
    earnings: "₹5,670",
  },
  {
    id: "3",
    title: "Goa Travel Vlog | Hidden Beaches",
    creator: "travel_guru",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "18:30",
    views: "1.5M",
    likes: "89K",
    uploadTime: "3 days ago",
    category: "travel",
    type: "long-form",
    isMonetized: true,
    earnings: "₹18,900",
  },
  {
    id: "4",
    title: "Funny Indian Parents Reactions",
    creator: "comedy_king",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "1:20",
    views: "3.2M",
    likes: "234K",
    uploadTime: "5 hours ago",
    category: "comedy",
    type: "short-form",
    isMonetized: true,
    earnings: "₹25,600",
  },
]

const personalizedVideos = [
  {
    id: "5",
    title: "Best Tech Gadgets Under ₹5000",
    creator: "tech_reviewer",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "15:20",
    views: "567K",
    likes: "34K",
    uploadTime: "1 week ago",
    category: "tech",
    type: "long-form",
    aiScore: 0.95, // AI recommendation score
    reason: "Based on your tech interests",
  },
  {
    id: "6",
    title: "Morning Yoga Routine",
    creator: "fitness_guru",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "8:45",
    views: "234K",
    likes: "18K",
    uploadTime: "3 days ago",
    category: "fitness",
    type: "long-form",
    aiScore: 0.87,
    reason: "Popular in your area",
  },
]

const liveStreams = [
  {
    id: "live1",
    title: "Cooking Live: Butter Chicken Recipe",
    creator: "chef_priya",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    viewers: "1.2K",
    category: "food",
    isLive: true,
  },
  {
    id: "live2",
    title: "Gaming Session: BGMI Tournament",
    creator: "pro_gamer",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    viewers: "3.5K",
    category: "gaming",
    isLive: true,
  },
]

export function VideoHub({ onVideoPlay }: VideoHubProps) {
  const [activeTab, setActiveTab] = useState("foryou")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [videos, setVideos] = useState(trendingVideos)

  // Simulate AI-driven personalization
  useEffect(() => {
    if (activeTab === "foryou") {
      // Simulate AI recommendation algorithm
      const personalizedContent = [...personalizedVideos, ...trendingVideos].sort(
        (a, b) => (b.aiScore || 0.5) - (a.aiScore || 0.5),
      )
      setVideos(personalizedContent)
    } else if (activeTab === "trending") {
      setVideos(trendingVideos.sort((a, b) => Number.parseInt(b.views) - Number.parseInt(a.views)))
    } else if (activeTab === "live") {
      setVideos(liveStreams)
    }
  }, [activeTab])

  const filteredVideos = videos.filter((video) => {
    if (selectedCategory !== "all" && video.category !== selectedCategory) return false
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const formatDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(":")
    return `${minutes}:${seconds}`
  }

  const VideoCard = ({ video, isLive = false }: { video: any; isLive?: boolean }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onVideoPlay(video)}>
      <div className="relative">
        <img
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />

        {/* Duration or Live Badge */}
        <div className="absolute bottom-2 right-2">
          {isLive ? (
            <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
          ) : (
            <Badge className="bg-black/75 text-white">{video.duration}</Badge>
          )}
        </div>

        {/* Video Type Badge */}
        {!isLive && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs">
              {video.type === "short-form" ? "Short" : "Long"}
            </Badge>
          </div>
        )}

        {/* Monetization Badge */}
        {video.isMonetized && !isLive && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500 text-white text-xs">💰 Monetized</Badge>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30 rounded-t-lg">
          <div className="bg-white/90 rounded-full p-3">
            <Play className="w-8 h-8 text-gray-800" />
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={video.avatar || "/placeholder.svg"} alt={video.creator} />
            <AvatarFallback>{video.creator[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">{video.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{video.creator}</p>

            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {isLive ? (
                <>
                  <Users className="w-3 h-3" />
                  <span>{video.viewers} watching</span>
                </>
              ) : (
                <>
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.uploadTime}</span>
                </>
              )}
            </div>

            {/* AI Recommendation Reason */}
            {video.reason && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  🤖 {video.reason}
                </Badge>
              </div>
            )}

            {/* Earnings (for creator view) */}
            {video.earnings && (
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-800 text-xs">Earned: {video.earnings}</Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="pb-20">
      {/* Header with Upload Button */}
      <div className="sticky top-16 bg-white dark:bg-gray-900 z-40 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Video Hub</h2>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload Video
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {videoCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className="flex-shrink-0"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
          <TabsTrigger value="foryou" className="flex items-center space-x-1">
            <span>🤖</span>
            <span>For You</span>
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center space-x-1">
            <span>🔴</span>
            <span>Live</span>
          </TabsTrigger>
          <TabsTrigger value="shorts" className="flex items-center space-x-1">
            <span>⚡</span>
            <span>Shorts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="foryou" className="mt-6">
          <div className="px-4">
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">🤖</span>
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">AI Personalized</h3>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Videos curated based on your interests, viewing history, and trending content in your region.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="px-4">
            <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-orange-800 dark:text-orange-200">Trending Now</h3>
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Most popular videos across India right now.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVideos.map((video, index) => (
                <div key={video.id} className="relative">
                  <VideoCard video={video} />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-orange-500 text-white">#{index + 1} Trending</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <div className="px-4">
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg animate-pulse">🔴</span>
                <h3 className="font-semibold text-red-800 dark:text-red-200">Live Streams</h3>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">Join live streams happening right now!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveStreams.map((stream) => (
                <VideoCard key={stream.id} video={stream} isLive={true} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shorts" className="mt-6">
          <div className="px-4">
            <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">⚡</span>
                <h3 className="font-semibold text-purple-800 dark:text-purple-200">Short Videos</h3>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">Quick, engaging content under 60 seconds.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {filteredVideos
                .filter((video) => video.type === "short-form")
                .map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Insights Panel */}
      <div className="mx-4 mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center space-x-2">
          <span>🧠</span>
          <span>AI Insights</span>
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Your Top Interest</p>
            <p className="font-semibold">Food & Cooking</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Watch Time Today</p>
            <p className="font-semibold">2h 34m</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Recommended Upload Time</p>
            <p className="font-semibold">7-9 PM</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Trending in Your Area</p>
            <p className="font-semibold">#MumbaiFood</p>
          </div>
        </div>
      </div>
    </div>
  )
}
