"use client"

import { useState } from "react"
import { ArrowLeft, Search, Edit, Phone, Video, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface DirectMessagesProps {
  onClose: () => void
}

const conversations = [
  {
    id: "1",
    username: "john_doe",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m",
    unread: 2,
    isOnline: true,
  },
  {
    id: "2",
    username: "jane_smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for sharing that recipe!",
    timestamp: "1h",
    unread: 0,
    isOnline: false,
  },
  {
    id: "3",
    username: "travel_guru",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The photos from Goa are amazing! 📸",
    timestamp: "3h",
    unread: 1,
    isOnline: true,
  },
  {
    id: "4",
    username: "foodie_life",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's try that new restaurant!",
    timestamp: "1d",
    unread: 0,
    isOnline: false,
  },
]

export function DirectMessages({ onClose }: DirectMessagesProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  if (selectedChat) {
    const chat = conversations.find((c) => c.id === selectedChat)
    if (!chat) return null

    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.username} />
              <AvatarFallback>{chat.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{chat.username}</p>
              <p className="text-xs text-gray-500">{chat.isOnline ? "Active now" : "Active 2h ago"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 pb-20">
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 max-w-xs">
              <p className="text-sm">Hey! How are you doing?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-2xl px-4 py-2 max-w-xs">
              <p className="text-sm">I'm doing great! Just posted some new photos</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 max-w-xs">
              <p className="text-sm">Can't wait to see them! 📸</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" disabled={!message.trim()}>
              Send
            </Button>
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
          <h2 className="font-semibold">Messages</h2>
        </div>
        <Button variant="ghost" size="sm">
          <Edit className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search messages..." className="pl-10" />
        </div>
      </div>

      {/* Conversations */}
      <div className="space-y-0">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center space-x-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => setSelectedChat(conversation.id)}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.username} />
                <AvatarFallback>{conversation.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm truncate">{conversation.username}</p>
                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
            </div>

            {conversation.unread > 0 && (
              <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                {conversation.unread}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
