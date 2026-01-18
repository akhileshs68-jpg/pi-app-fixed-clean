"\"use client"

import { useState } from "react"
import { ArrowLeft, ShieldAlert, CheckCircle, XCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContentModerationProps {
  onClose?: () => void
}

const reportedContent = [
  {
    id: "1",
    type: "post",
    reporter: "user123",
    content: "This post violates community guidelines.",
    reason: "Hate speech",
    status: "pending", // pending, approved, rejected
    time: "2h ago",
  },
  {
    id: "2",
    type: "comment",
    reporter: "viewer456",
    content: "Inappropriate language in this comment.",
    reason: "Harassment",
    status: "approved",
    time: "5h ago",
  },
  {
    id: "3",
    type: "profile",
    reporter: "admin789",
    content: "This profile contains misleading information.",
    reason: "Fake account",
    status: "rejected",
    time: "1d ago",
  },
]

export function ContentModeration({ onClose }: ContentModerationProps) {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [moderationList, setModerationList] = useState(reportedContent)

  const approveContent = (contentId: string) => {
    setModerationList((prev) => prev.map((item) => (item.id === contentId ? { ...item, status: "approved" } : item)))
  }

  const rejectContent = (contentId: string) => {
    setModerationList((prev) => prev.map((item) => (item.id === contentId ? { ...item, status: "rejected" } : item)))
  }

  const filteredContent = moderationList.filter((item) => {
    if (activeTab === "all") return true
    return item.status === activeTab
  })

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="font-semibold">Content Moderation</h2>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search reported content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 mx-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-0">
            {filteredContent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ShieldAlert className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-center">No content to moderate</p>
              </div>
            ) : (
              filteredContent.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>Reported Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                      <strong>Type:</strong> {item.type}
                    </p>
                    <p>
                      <strong>Reporter:</strong> {item.reporter}
                    </p>
                    <p>
                      <strong>Content:</strong> {item.content}
                    </p>
                    <p>
                      <strong>Reason:</strong> {item.reason}
                    </p>
                    <p>
                      <strong>Time:</strong> {item.time}
                    </p>
                    <div className="flex justify-end space-x-2">
                      {item.status === "pending" && (
                        <>
                          <Button variant="outline" onClick={() => approveContent(item.id)}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="destructive" onClick={() => rejectContent(item.id)}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      {item.status === "approved" && <Badge className="bg-green-500 text-white">Approved</Badge>}
                      {item.status === "rejected" && <Badge className="bg-red-500 text-white">Rejected</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
