"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Upload, Camera, Video, ImageIcon, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface VideoUploadProps {
  onClose: () => void
}

const videoCategories = [
  "Food & Cooking",
  "Travel",
  "Music",
  "Dance",
  "Comedy",
  "Tech",
  "Fitness",
  "Education",
  "Gaming",
  "Lifestyle",
  "News",
  "Sports",
]

const monetizationOptions = [
  { id: "ads", name: "Ad Revenue", description: "Earn from video advertisements", enabled: true },
  { id: "sponsorship", name: "Sponsorships", description: "Partner with brands", enabled: false },
  { id: "donations", name: "Fan Donations", description: "Accept tips from viewers", enabled: true },
  { id: "subscription", name: "Paid Content", description: "Subscriber-only content", enabled: false },
]

export function VideoUpload({ onClose }: VideoUploadProps) {
  const [uploadStep, setUploadStep] = useState(1) // 1: Upload, 2: Details, 3: Monetization, 4: Publish
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    location: "",
    isShortForm: false,
    visibility: "public", // public, unlisted, private
    allowComments: true,
    allowDownloads: false,
    ageRestriction: false,
  })
  const [monetization, setMonetization] = useState({
    enabled: false,
    adRevenue: true,
    sponsorships: false,
    donations: true,
    paidContent: false,
    price: [0], // for paid content
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setVideoFile(file)
      // Auto-detect if it's a short-form video (under 60 seconds)
      const video = document.createElement("video")
      video.preload = "metadata"
      video.onloadedmetadata = () => {
        setVideoDetails((prev) => ({
          ...prev,
          isShortForm: video.duration <= 60,
        }))
      }
      video.src = URL.createObjectURL(file)
      setUploadStep(2)
    }
  }

  const generateThumbnail = () => {
    if (videoFile) {
      const video = document.createElement("video")
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      video.onloadeddata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.currentTime = video.duration / 2 // Middle of video
      }

      video.onseeked = () => {
        ctx?.drawImage(video, 0, 0)
        setThumbnail(canvas.toDataURL())
      }

      video.src = URL.createObjectURL(videoFile)
    }
  }

  const handleUpload = async () => {
    setIsUploading(true)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setIsUploading(false)
    alert("Video uploaded successfully! 🎉")
    onClose()
  }

  const renderUploadStep = () => {
    switch (uploadStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-16 h-16 text-gray-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Upload Your Video</h2>
              <p className="text-gray-600 dark:text-gray-400">Share your creativity with the world</p>
            </div>

            <div className="space-y-4">
              <Button onClick={() => fileInputRef.current?.click()} className="w-full h-12" size="lg">
                <Video className="w-5 h-5 mr-2" />
                Select Video File
              </Button>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Camera className="w-4 h-4 mr-2" />
                  Record Now
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  From Gallery
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>• Supported formats: MP4, MOV, AVI, MKV</p>
              <p>• Max file size: 2GB</p>
              <p>• Recommended resolution: 1080p or higher</p>
            </div>

            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Video Details</h2>
              <Badge variant={videoDetails.isShortForm ? "default" : "secondary"}>
                {videoDetails.isShortForm ? "Short Video" : "Long Video"}
              </Badge>
            </div>

            {/* Video Preview */}
            {videoFile && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="w-32 h-20 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      {thumbnail ? (
                        <img
                          src={thumbnail || "/placeholder.svg"}
                          alt="Thumbnail"
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <Video className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{videoFile.name}</p>
                      <p className="text-sm text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={generateThumbnail}>
                        Generate Thumbnail
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  placeholder="Give your video a catchy title..."
                  value={videoDetails.title}
                  onChange={(e) => setVideoDetails((prev) => ({ ...prev, title: e.target.value }))}
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">{videoDetails.title.length}/100</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  placeholder="Tell viewers about your video..."
                  value={videoDetails.description}
                  onChange={(e) => setVideoDetails((prev) => ({ ...prev, description: e.target.value }))}
                  maxLength={5000}
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">{videoDetails.description.length}/5000</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={videoDetails.category}
                  onChange={(e) => setVideoDetails((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select a category</option>
                  {videoCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <Input
                  placeholder="Add tags separated by commas..."
                  value={videoDetails.tags}
                  onChange={(e) => setVideoDetails((prev) => ({ ...prev, tags: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Add location..."
                    value={videoDetails.location}
                    onChange={(e) => setVideoDetails((prev) => ({ ...prev, location: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setUploadStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setUploadStep(3)}
                disabled={!videoDetails.title || !videoDetails.category}
                className="flex-1"
              >
                Next: Monetization
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Monetization Settings</h2>
              <Badge className="bg-green-500 text-white">
                <DollarSign className="w-3 h-3 mr-1" />
                Earn Money
              </Badge>
            </div>

            <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">💰 Monetize Your Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                  Turn on monetization to start earning from your videos through ads, sponsorships, and fan donations.
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Enable Monetization</span>
                  <Switch
                    checked={monetization.enabled}
                    onCheckedChange={(checked) => setMonetization((prev) => ({ ...prev, enabled: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {monetization.enabled && (
              <div className="space-y-4">
                <h3 className="font-semibold">Revenue Streams</h3>

                {monetizationOptions.map((option) => (
                  <Card key={option.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                        </div>
                        <Switch
                          checked={monetization[option.id as keyof typeof monetization] as boolean}
                          onCheckedChange={(checked) => setMonetization((prev) => ({ ...prev, [option.id]: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {monetization.paidContent && (
                  <Card>
                    <CardContent className="p-4">
                      <label className="block text-sm font-medium mb-2">Content Price (₹)</label>
                      <Slider
                        value={monetization.price}
                        onValueChange={(value) => setMonetization((prev) => ({ ...prev, price: value }))}
                        max={1000}
                        step={10}
                        className="mb-2"
                      />
                      <p className="text-sm text-gray-600">₹{monetization.price[0]}</p>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Monetization Tips</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Videos over 8 minutes earn more ad revenue</li>
                      <li>• Consistent uploads increase earnings</li>
                      <li>• Engage with comments to boost visibility</li>
                      <li>• Use trending hashtags and topics</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setUploadStep(2)}>
                Back
              </Button>
              <Button onClick={() => setUploadStep(4)} className="flex-1">
                Next: Publish Settings
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Publish Settings</h2>

            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={videoDetails.visibility === "public"}
                      onChange={(e) => setVideoDetails((prev) => ({ ...prev, visibility: e.target.value }))}
                    />
                    <div>
                      <p className="font-medium">Public</p>
                      <p className="text-sm text-gray-600">Anyone can search for and view</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="visibility"
                      value="unlisted"
                      checked={videoDetails.visibility === "unlisted"}
                      onChange={(e) => setVideoDetails((prev) => ({ ...prev, visibility: e.target.value }))}
                    />
                    <div>
                      <p className="font-medium">Unlisted</p>
                      <p className="text-sm text-gray-600">Anyone with the link can view</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={videoDetails.visibility === "private"}
                      onChange={(e) => setVideoDetails((prev) => ({ ...prev, visibility: e.target.value }))}
                    />
                    <div>
                      <p className="font-medium">Private</p>
                      <p className="text-sm text-gray-600">Only you can view</p>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Comments</p>
                    <p className="text-sm text-gray-600">Let viewers comment on your video</p>
                  </div>
                  <Switch
                    checked={videoDetails.allowComments}
                    onCheckedChange={(checked) => setVideoDetails((prev) => ({ ...prev, allowComments: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Downloads</p>
                    <p className="text-sm text-gray-600">Let viewers download your video</p>
                  </div>
                  <Switch
                    checked={videoDetails.allowDownloads}
                    onCheckedChange={(checked) => setVideoDetails((prev) => ({ ...prev, allowDownloads: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Age Restriction</p>
                    <p className="text-sm text-gray-600">Restrict to viewers 18+</p>
                  </div>
                  <Switch
                    checked={videoDetails.ageRestriction}
                    onCheckedChange={(checked) => setVideoDetails((prev) => ({ ...prev, ageRestriction: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload Progress */}
            {isUploading && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span className="font-medium">Uploading...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{uploadProgress}% complete</p>
                </CardContent>
              </Card>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setUploadStep(3)} disabled={isUploading}>
                Back
              </Button>
              <Button onClick={handleUpload} disabled={isUploading} className="flex-1">
                {isUploading ? "Uploading..." : "Publish Video"}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isUploading}>
            <X className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Upload Video</h1>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`w-2 h-2 rounded-full ${step <= uploadStep ? "bg-blue-500" : "bg-gray-300"}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-2xl mx-auto">{renderUploadStep()}</div>
    </div>
  )
}
