"use client"

import { MessageCircle, Heart, Search, Bell, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  onOpenDM: () => void
  onOpenSearch?: () => void
  onOpenNotifications?: () => void
  onToggleTheme?: () => void
  currentLanguage?: string
  onLanguageChange?: (language: string) => void
}

export function Header({
  onOpenDM,
  onOpenSearch,
  onOpenNotifications,
  onToggleTheme,
  currentLanguage = "en",
}: HeaderProps) {
  const isDarkMode = document.documentElement.classList.contains("dark")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Popo
          </h1>
          <Badge variant="secondary" className="ml-2 text-xs">
            {currentLanguage.toUpperCase()}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          {onOpenSearch && (
            <Button variant="ghost" size="sm" onClick={onOpenSearch}>
              <Search className="w-6 h-6" />
            </Button>
          )}

          <Button variant="ghost" size="sm">
            <Heart className="w-6 h-6" />
          </Button>

          <Button variant="ghost" size="sm" onClick={onOpenDM}>
            <MessageCircle className="w-6 h-6" />
          </Button>

          {onOpenNotifications && (
            <Button variant="ghost" size="sm" onClick={onOpenNotifications} className="relative">
              <Bell className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
          )}

          {onToggleTheme && (
            <Button variant="ghost" size="sm" onClick={onToggleTheme}>
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
