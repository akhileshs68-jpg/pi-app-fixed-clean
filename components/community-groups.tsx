"use client"

import { useState } from "react"
import { ArrowLeft, Search, Plus, Users, Calendar, MapPin, MessageCircle, Heart, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CommunityGroupsProps {
  onClose: () => void
}

const groups = [
  {
    id: "1",
    name: "Mumbai Food Lovers",
    description: "Discover the best food spots in Mumbai",
    members: 12500,
    posts: 1250,
    category: "Food & Dining",
    image: "/placeholder.svg?height=200&width=300",
    isJoined: true,
    isPrivate: false,
  },
  {
    id: "2",
    name: "Bollywood Dance Community",
    description: "Learn and share Bollywood dance moves",
    members: 8900,
    posts: 890,
    category: "Dance & Music",
    image: "/placeholder.svg?height=200&width=300",
    isJoined: false,
    isPrivate: false,
  },
  {
    id: "3",
    name: "Tech Entrepreneurs India",
    description: "Network with fellow entrepreneurs",
    members: 5600,
    posts: 456,
    category: "Business",
    image: "/placeholder.svg?height=200&width=300",
    isJoined: true,
    isPrivate: true,
  },
]

const events = [
  {
    id: "1",
    title: "Mumbai Food Festival 2024",
    date: "March 15, 2024",
    time: "6:00 PM",
    location: "Bandra Kurla Complex",
    attendees: 234,
    image: "/placeholder.svg?height=150&width=200",
    isAttending: false,
  },
  {
    id: "2",
    title: "Bollywood Dance Workshop",
    date: "March 20, 2024",
    time: "4:00 PM",
    location: "Andheri Dance Studio",
    attendees: 45,
    image: "/placeholder.svg?height=150&width=200",
    isAttending: true,
  },
]

const groupPosts = [
  {
    id: "1",
    user: "foodie_mumbai",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Just discovered this amazing street food stall in Colaba! The vada pav is incredible 🤤",
    image: "/placeholder.svg?height=300&width=400",
    likes: 156,
    comments: 23,
    timeAgo: "2h ago",
    group: "Mumbai Food Lovers",
  },
  {
    id: "2",
    user: "dance_queen",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "New choreography for the latest Bollywood hit! Who wants to learn? 💃",
    image: "/placeholder.svg?height=300&width=400",
    likes: 89,
    comments: 12,
    timeAgo: "4h ago",
    group: "Bollywood Dance Community",
  },
]

export function CommunityGroups({ onClose }: CommunityGroupsProps) {
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const joinGroup = (groupId: string) => {
    // Handle group joining logic
    console.log("Joining group:", groupId)
  }

  const attendEvent = (eventId: string) => {
    // Handle event attendance logic
    console.log("Attending event:", eventId)
  }

  if (selectedGroup) {
    const group = groups.find((g) => g.id === selectedGroup)
    if (!group) return null

    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
        {/* Group Header */}
        <div className="relative">
          <img src={group.image || "/placeholder.svg"} alt={group.name} className="w-full h-48 object-cover" />
          <div className="absolute top-4 left-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedGroup(null)} className="bg-black/50 text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <span>{group.members.toLocaleString()} members</span>
              <span>•</span>
              <span>{group.posts} posts</span>
              {group.isPrivate && <Badge variant="secondary">Private</Badge>}
            </div>
          </div>
        </div>

        {/* Group Content */}
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{group.description}</p>

          <div className="flex space-x-2 mb-6">
            {group.isJoined ? (
              <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">✓ Joined</Button>
            ) : (
              <Button onClick={() => joinGroup(group.id)} className="flex-1">
                Join Group
              </Button>
            )}
            <Button variant="outline">
              <Share className="w-4 h-4" />
            </Button>
          </div>

          {/* Group Posts */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recent Posts</h3>
            {groupPosts
              .filter((post) => post.group === group.name)
              .map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="w-8 h-8">
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
                        className="w-full rounded-lg mb-3"
                      />
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <button className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="font-semibold">Communities</h2>
        </div>
        <Button variant="ghost" size="sm">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search groups and events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 mx-4">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="mygroups">My Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="p-4 space-y-4">
          <h3 className="font-semibold">Suggested Groups</h3>
          {groups.map((group) => (
            <Card key={group.id} className="cursor-pointer" onClick={() => setSelectedGroup(group.id)}>
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <img
                    src={group.image || "/placeholder.svg"}
                    alt={group.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{group.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{group.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{group.members.toLocaleString()}</span>
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {group.category}
                      </Badge>
                      {group.isPrivate && (
                        <Badge variant="outline" className="text-xs">
                          Private
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    {group.isJoined ? (
                      <Badge className="bg-green-500 text-white">Joined</Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          joinGroup(group.id)
                        }}
                      >
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mygroups" className="p-4 space-y-4">
          <h3 className="font-semibold">Your Groups</h3>
          {groups
            .filter((group) => group.isJoined)
            .map((group) => (
              <Card key={group.id} className="cursor-pointer" onClick={() => setSelectedGroup(group.id)}>
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <img
                      src={group.image || "/placeholder.svg"}
                      alt={group.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{group.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{group.description}</p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                        <span>{group.members.toLocaleString()} members</span>
                        <span>•</span>
                        <span>{group.posts} posts</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="events" className="p-4 space-y-4">
          <h3 className="font-semibold">Upcoming Events</h3>
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{event.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    {event.isAttending ? (
                      <Badge className="bg-green-500 text-white">Going</Badge>
                    ) : (
                      <Button size="sm" onClick={() => attendEvent(event.id)}>
                        RSVP
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
