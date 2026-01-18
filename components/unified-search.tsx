"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UnifiedSearchProps {
  onClose: () => void
}

const trendingSearches = [
  "#PopoChallenge",
  "Mumbai Food",
  "Bollywood Dance",
  "Tech News",
  "Travel India",
  "Fitness Tips",
]

const recentSearches = ["street food mumbai", "bollywood songs", "tech startups", "travel vlog"]

const searchResults = {
  videos: [
    {
      id: "1",
      title: "Best Street Food in Mumbai | Food Tour",
      creator: "foodie_mumbai",
      views: "1.2M",
      duration: "8:45",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "2",
      title: "Bollywood Dance Tutorial | Latest Moves",
      creator: "dance_queen",
      views: "890K",
      duration: "5:30",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ],
  posts: [
    {
      id: "1",
      user: "travel_guru",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Amazing sunset at Marine Drive! Mumbai never fails to amaze me 🌅",
      image: "/placeholder.svg?height=200&width=300",
      likes: 1234,
      timeAgo: "2h ago",
    },
  ],
  profiles: [
    {
      id: "1",
      username: "mumbai_foodie",
      name: "Mumbai Food Explorer",
      avatar: "/placeholder.svg?height=50&width=50",
      followers: "234K",
      isVerified: true,
      bio: "Exploring the best food in Mumbai 🍛",
    },
    {
      id: "2",
      username: "bollywood_dancer",
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=50&width=50",
      followers: "156K",
      isVerified: false,
      bio: "Professional Bollywood dancer & choreographer 💃",
    },
  ],
  groups: [
    {
      id: "1",
      name: "Mumbai Food Lovers",
      members: "12.5K",
      image: "/placeholder.svg?height=60&width=60",
      category: "Food & Dining",
    },
  ],
}

export function UnifiedSearch({ onClose }: UnifiedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setShowResults(true)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowResults(false)
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-gray-700">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search videos, posts, profiles, groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            className="pl-10 pr-10"
            autoFocus
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={clearSearch}
            >
              ✕
            </Button>
          )}
        </div>
        <Button variant="ghost" size="sm">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {!showResults ? (
        <div className="p-4">
          {/* Trending Searches */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold">Trending</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((trend) => (
                <Badge
                  key={trend}
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => handleSearch(trend)}
                >
                  {trend}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold">Recent</h3>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search) => (
                <div
                  key={search}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer"
                  onClick={() => handleSearch(search)}
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{search}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          {/* Search Results Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-5 mx-4 mt-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="profiles">People</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="p-4 space-y-6">
              {/* Videos Section */}
              <div>
                <h3 className="font-semibold mb-3">Videos</h3>
                <div className="space-y-3">
                  {searchResults.videos.slice(0, 2).map((video) => (
                    <div key={video.id} className="flex space-x-3">
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-32 h-20 object-cover rounded"
                        />
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{video.creator}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{video.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Posts Section */}
              <div>
                <h3 className="font-semibold mb-3">Posts</h3>
                <div className="space-y-3">
                  {searchResults.posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.user} />
                          <AvatarFallback>{post.user[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{post.user}</p>
                          <p className="text-xs text-gray-500">{post.timeAgo}</p>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Profiles Section */}
              <div>
                <h3 className="font-semibold mb-3">People</h3>
                <div className="space-y-3">
                  {searchResults.profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.username} />
                        <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-sm">{profile.username}</p>
                          {profile.isVerified && <span className="text-blue-500">✓</span>}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{profile.name}</p>
                        <p className="text-xs text-gray-500">{profile.followers} followers</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="p-4">
              <div className="space-y-4">
                {searchResults.videos.map((video) => (
                  <div key={video.id} className="flex space-x-3">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-40 h-24 object-cover rounded"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-2">{video.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{video.creator}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{video.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="posts" className="p-4">
              <div className="space-y-4">
                {searchResults.posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.user} />
                        <AvatarFallback>{post.user[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{post.user}</p>
                        <p className="text-xs text-gray-500">{post.timeAgo}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post content"
                        className="w-full h-48 object-cover rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profiles" className="p-4">
              <div className="space-y-4">
                {searchResults.profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.username} />
                      <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold">{profile.username}</p>
                        {profile.isVerified && <span className="text-blue-500">✓</span>}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{profile.name}</p>
                      <p className="text-xs text-gray-500 mb-2">{profile.followers} followers</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{profile.bio}</p>
                    </div>
                    <Button size="sm">Follow</Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="groups" className="p-4">
              <div className="space-y-4">
                {searchResults.groups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <img
                      src={group.image || "/placeholder.svg"}
                      alt={group.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{group.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{group.members} members</p>
                      <Badge variant="secondary" className="text-xs">
                        {group.category}
                      </Badge>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
