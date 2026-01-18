"use client"

import { useState, useEffect } from "react"
import { X, Heart, Share, Users, Gift, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface LiveStreamingProps {
  onClose: () => void
}

const liveComments = [
  { id: "1", user: "viewer123", message: "Amazing stream! 🔥", timestamp: "now" },
  { id: "2", user: "fan_girl", message: "Love your content!", timestamp: "2s ago" },
  { id: "3", user: "music_lover", message: "Play my favorite song please 🎵", timestamp: "5s ago" },
  { id: "4", user: "supporter", message: "Sending love from Delhi! ❤️", timestamp: "8s ago" },
]

export function LiveStreaming({ onClose }: LiveStreamingProps) {
  const [isLive, setIsLive] = useState(false)
  const [viewers, setViewers] = useState(1247)
  const [likes, setLikes] = useState(3456)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(liveComments)
  const [donations, setDonations] = useState(0)

  useEffect(() => {
    // Simulate live viewer count changes
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 10) - 5)
      setLikes((prev) => prev + Math.floor(Math.random() * 5))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const startLiveStream = () => {
    setIsLive(true)
  }

  const endLiveStream = () => {
    setIsLive(false)
    onClose()
  }

  const sendComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        user: "your_username",
        message: comment,
        timestamp: "now",
      }
      setComments((prev) => [newComment, ...prev.slice(0, 9)])
      setComment("")
    }
  }

  const sendHeart = () => {
    setLikes((prev) => prev + 1)
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Live Stream Video */}
      <div className="relative h-full">
        {/* Camera Feed / Stream Content */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
          {!isLive ? (
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📹</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Ready to go live?</h2>
              <p className="text-gray-300 mb-6">Share your moments with your followers</p>
              <Button onClick={startLiveStream} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3">
                Start Live Stream
              </Button>
            </div>
          ) : (
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔴</span>
                </div>
              </div>
              <Badge className="bg-red-500 text-white mb-4 animate-pulse">🔴 LIVE</Badge>
              <h2 className="text-xl font-bold">You're live!</h2>
            </div>
          )}
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            {isLive && <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>}
            <div className="flex items-center space-x-1 text-white bg-black/50 rounded-full px-3 py-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{viewers.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white bg-black/50">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white bg-black/50" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Live Stats */}
        {isLive && (
          <div className="absolute top-20 left-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-1 text-white bg-black/50 rounded-full px-3 py-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">{likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 text-white bg-black/50 rounded-full px-3 py-1">
              <Gift className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">₹{donations}</span>
            </div>
          </div>
        )}

        {/* Live Comments */}
        {isLive && (
          <div className="absolute right-4 top-32 bottom-32 w-64 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-black/50 rounded-lg p-2 text-white text-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-blue-300">{comment.user}</span>
                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                  </div>
                  <p>{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4">
          {isLive ? (
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  placeholder="Say something..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendComment()}
                  className="bg-black/50 border-white/20 text-white placeholder-gray-400"
                />
                <Button onClick={sendComment} size="sm" className="bg-blue-500 hover:bg-blue-600">
                  Send
                </Button>
              </div>
              <Button onClick={sendHeart} variant="ghost" size="sm" className="text-white bg-black/50">
                <Heart className="w-5 h-5 text-red-500" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white bg-black/50">
                <Share className="w-5 h-5" />
              </Button>
              <Button onClick={endLiveStream} className="bg-red-500 hover:bg-red-600 text-white">
                End Live
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-white/70 text-sm mb-4">Connect with your audience in real-time</p>
            </div>
          )}
        </div>

        {/* Floating Hearts Animation */}
        {isLive && (
          <div className="absolute bottom-32 right-8 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce text-red-500 text-2xl"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "2s",
                  bottom: `${i * 20}px`,
                }}
              >
                ❤️
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
