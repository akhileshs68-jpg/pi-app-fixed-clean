"use client"

import { useState } from "react"
import { X, Camera, ImageIcon, Video, MapPin, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreatePostProps {
  onClose: () => void
}

export function CreatePost({ onClose }: CreatePostProps) {
  const [caption, setCaption] = useState("")
  const [location, setLocation] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)

  const handleMediaSelect = (type: string) => {
    // Simulate media selection
    setSelectedMedia(`/placeholder.svg?height=300&width=300&query=${type}`)
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold">New Post</h2>
        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
          Share
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Media Selection */}
        {!selectedMedia ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="space-y-4">
              <div className="text-gray-500 mb-4">
                <Camera className="w-12 h-12 mx-auto mb-2" />
                <p>Select photos and videos to share</p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => handleMediaSelect("photo")}
                  className="flex items-center space-x-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Photo</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleMediaSelect("video")}
                  className="flex items-center space-x-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={selectedMedia || "/placeholder.svg"}
              alt="Selected media"
              className="w-full aspect-square object-cover rounded-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your profile" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <span className="font-semibold">your_username</span>
        </div>

        {/* Caption */}
        <Textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="min-h-[100px] resize-none border-0 p-0 text-base"
        />

        {/* Location */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Add location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-0 p-0 text-sm"
          />
        </div>

        {/* Additional Options */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm">Tag People</span>
            <Button variant="ghost" size="sm">
              <Tag className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Add Music</span>
            <Button variant="ghost" size="sm">
              <span className="text-lg">🎵</span>
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Advanced Settings</span>
            <Button variant="ghost" size="sm">
              <span className="text-lg">⚙️</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
