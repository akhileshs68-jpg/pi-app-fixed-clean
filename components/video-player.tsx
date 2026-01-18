"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Share, MoreVertical, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface VideoPlayerProps {
  video?: any
  onClose?: () => void
}

const sampleVideo = {
  id: "1",
  title: "Amazing Street Food in Mumbai | Food Vlog",
  creator: "foodie_mumbai",
  avatar: "/placeholder.svg?height=40&width=40",
  views: "1.2M",
  likes: 45600,
  dislikes: 1200,
  duration: "8:45",
  uploadTime: "2 days ago",
  description:
    "Join me as I explore the best street food in Mumbai! From vada pav to pav bhaji, this city has it all. Don't forget to like and subscribe for more food adventures! 🍛",
  category: "Food & Cooking",
  isLive: false,
  subscribers: "234K",
  isMonetized: true,
  earnings: "₹1000",
}

const relatedVideos = [
  {
    id: "2",
    title: "Delhi Street Food Tour",
    creator: "delhi_foodie",
    views: "890K",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "3",
    title: "Best Biryani in Hyderabad",
    creator: "biryani_lover",
    views: "1.5M",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "4",
    title: "Goa Beach Food Guide",
    creator: "coastal_eats",
    views: "567K",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

const comments = [
  {
    id: "1",
    user: "food_lover123",
    avatar: "/placeholder.svg?height=32&width=32",
    comment: "Amazing video! Made me so hungry 😋",
    likes: 23,
    time: "2h ago",
  },
  {
    id: "2",
    user: "mumbai_local",
    avatar: "/placeholder.svg?height=32&width=32",
    comment: "You missed the best vada pav stall near CST station!",
    likes: 15,
    time: "4h ago",
  },
  {
    id: "3",
    user: "travel_foodie",
    avatar: "/placeholder.svg?height=32&width=32",
    comment: "Planning my Mumbai trip based on this video! Thanks 🙏",
    likes: 8,
    time: "6h ago",
  },
]

export function VideoPlayer({ video = sampleVideo, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState([0])
  const [volume, setVolume] = useState([80])
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=400&width=800"
          controls={false}
        >
          <source src="/placeholder.mp4" type="video/mp4" />
        </video>

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            {/* Progress Bar */}
            <Slider value={progress} onValueChange={setProgress} max={100} step={1} className="mb-4" />

            {/* Controls */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-20" />
                </div>
                <span className="text-sm">0:00 / {video.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white">
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        {onClose && (
          <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-white bg-black/50" onClick={onClose}>
            ✕
          </Button>
        )}
      </div>

      {/* Video Info */}
      <div className="bg-white dark:bg-gray-900 p-4">
        <h1 className="text-lg font-semibold mb-2">{video.title}</h1>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{video.uploadTime}</span>
            <Badge variant="secondary">{video.category}</Badge>
          </div>
        </div>

        {/* Creator Info & Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={video.avatar || "/placeholder.svg"} alt={video.creator} />
              <AvatarFallback>{video.creator[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{video.creator}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{video.subscribers} subscribers</p>
            </div>
          </div>
          <Button
            onClick={handleSubscribe}
            className={`${isSubscribed ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"} text-white`}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>

        {/* Engagement Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? "bg-blue-50 text-blue-600" : ""}`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{(video.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDislike}
              className={`flex items-center space-x-2 ${isDisliked ? "bg-red-50 text-red-600" : ""}`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{(video.dislikes + (isDisliked ? 1 : 0)).toLocaleString()}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">{video.description}</p>
        </div>

        {/* Monetization Info (for creators) */}
        {video.isMonetized && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-800 dark:text-green-200">💰 Monetization Active</h4>
                <Badge className="bg-green-500 text-white">Earning</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-700 dark:text-green-300">Estimated Earnings</p>
                  <p className="font-semibold text-green-800 dark:text-green-200">{video.earnings || "₹0"}</p>
                </div>
                <div>
                  <p className="text-green-700 dark:text-green-300">Revenue Sources</p>
                  <p className="font-semibold text-green-800 dark:text-green-200">Ads, Donations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Recommendations Explanation */}
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🤖</span>
              <h4 className="font-medium text-blue-800 dark:text-blue-200">Why this video?</h4>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Recommended based on your interest in {video.category} content and similar videos you've enjoyed.
            </p>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Comments ({comments.length})</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
              {showComments ? "Hide" : "Show"} Comments
            </Button>
          </div>

          {/* Add Comment */}
          <div className="flex items-start space-x-3 mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your avatar" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[60px] resize-none"
              />
              <div className="flex justify-end mt-2">
                <Button size="sm" disabled={!newComment.trim()}>
                  Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {showComments && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                    <AvatarFallback>{comment.user[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{comment.comment}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Videos */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <h3 className="font-semibold mb-4">Related Videos</h3>
          <div className="space-y-3">
            {relatedVideos.map((relatedVideo) => (
              <div
                key={relatedVideo.id}
                className="flex space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
              >
                <img
                  src={relatedVideo.thumbnail || "/placeholder.svg"}
                  alt={relatedVideo.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{relatedVideo.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{relatedVideo.creator}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{relatedVideo.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
