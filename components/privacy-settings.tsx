"use client"

import { useState } from "react"
import { ArrowLeft, Shield, Eye, Lock, Users, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface PrivacySettingsProps {
  onClose: () => void
}

export function PrivacySettings({ onClose }: PrivacySettingsProps) {
  const [settings, setSettings] = useState({
    profileVisibility: "public", // public, friends, private
    postVisibility: "public",
    storyVisibility: "friends",
    allowComments: true,
    allowDMs: true,
    allowTagging: true,
    showOnlineStatus: true,
    allowLocationTracking: false,
    dataCollection: true,
    personalizedAds: true,
    analyticsSharing: false,
    twoFactorAuth: false,
    loginNotifications: true,
    downloadData: false,
    deleteAccount: false,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleDataDownload = () => {
    // Implement data download as per DPDP Act 2023
    alert(
      "Your data download request has been submitted. You will receive an email within 30 days as per DPDP Act 2023.",
    )
  }

  const handleAccountDeletion = () => {
    // Implement account deletion as per Right to be Forgotten
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed as per DPDP Act 2023.",
      )
    ) {
      alert("Account deletion request submitted. Your account will be deleted within 30 days.")
    }
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold">Privacy & Security</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Data Protection Compliance Notice */}
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
              <Shield className="w-5 h-5" />
              <span>Data Protection Compliance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              Popo is fully compliant with India's Digital Personal Data Protection Act (DPDP) 2023, GDPR, and CCPA.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">DPDP Act 2023</Badge>
              <Badge variant="secondary">GDPR Compliant</Badge>
              <Badge variant="secondary">CCPA Compliant</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Account Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Account Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Who can see your profile</p>
              </div>
              <select
                value={settings.profileVisibility}
                onChange={(e) => updateSetting("profileVisibility", e.target.value)}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Post Visibility</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Default visibility for new posts</p>
              </div>
              <select
                value={settings.postVisibility}
                onChange={(e) => updateSetting("postVisibility", e.target.value)}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Only Me</option>
              </select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Story Visibility</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Who can see your stories</p>
              </div>
              <select
                value={settings.storyVisibility}
                onChange={(e) => updateSetting("storyVisibility", e.target.value)}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="close-friends">Close Friends</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Interaction Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Interactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow Comments</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let others comment on your posts</p>
              </div>
              <Switch
                checked={settings.allowComments}
                onCheckedChange={(checked) => updateSetting("allowComments", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow Direct Messages</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive messages from others</p>
              </div>
              <Switch checked={settings.allowDMs} onCheckedChange={(checked) => updateSetting("allowDMs", checked)} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow Tagging</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let others tag you in posts</p>
              </div>
              <Switch
                checked={settings.allowTagging}
                onCheckedChange={(checked) => updateSetting("allowTagging", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Online Status</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let others see when you're active</p>
              </div>
              <Switch
                checked={settings.showOnlineStatus}
                onCheckedChange={(checked) => updateSetting("showOnlineStatus", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Data & Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Location Tracking</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Allow location-based features</p>
              </div>
              <Switch
                checked={settings.allowLocationTracking}
                onCheckedChange={(checked) => updateSetting("allowLocationTracking", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Collection for Improvement</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Help improve Popo with usage data</p>
              </div>
              <Switch
                checked={settings.dataCollection}
                onCheckedChange={(checked) => updateSetting("dataCollection", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Personalized Ads</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Show ads based on your interests</p>
              </div>
              <Switch
                checked={settings.personalizedAds}
                onCheckedChange={(checked) => updateSetting("personalizedAds", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analytics Sharing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share anonymized analytics with partners</p>
              </div>
              <Switch
                checked={settings.analyticsSharing}
                onCheckedChange={(checked) => updateSetting("analyticsSharing", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add extra security to your account</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new logins</p>
              </div>
              <Switch
                checked={settings.loginNotifications}
                onCheckedChange={(checked) => updateSetting("loginNotifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Rights (DPDP Act 2023 Compliance) */}
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
              <Download className="w-5 h-5" />
              <span>Your Data Rights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
              As per DPDP Act 2023, you have the right to access, correct, and delete your personal data.
            </p>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleDataDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download My Data
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => alert("Data correction form will be available soon.")}
              >
                <Shield className="w-4 h-4 mr-2" />
                Request Data Correction
              </Button>

              <Button variant="destructive" className="w-full justify-start" onClick={handleAccountDeletion}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete My Account
              </Button>
            </div>

            <div className="text-xs text-orange-600 dark:text-orange-400 mt-4">
              <p>• Data download requests are processed within 30 days</p>
              <p>• Account deletion is permanent and cannot be undone</p>
              <p>• You will be notified within 72 hours of any data breaches</p>
            </div>
          </CardContent>
        </Card>

        {/* Legal Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Legal & Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-blue-600">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start text-blue-600">
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start text-blue-600">
              Cookie Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start text-blue-600">
              Data Processing Agreement
            </Button>
            <Button variant="ghost" className="w-full justify-start text-blue-600">
              Community Guidelines
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
