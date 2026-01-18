"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
]

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [showSelector, setShowSelector] = useState(false)

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode)
    localStorage.setItem("popo-language", langCode)
    setShowSelector(false)
  }

  if (!showSelector) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="fixed bottom-24 left-4 bg-white dark:bg-gray-800 shadow-lg rounded-full"
        onClick={() => setShowSelector(true)}
      >
        <Globe className="w-4 h-4 mr-2" />
        <span className="text-xs">{currentLang.nativeName}</span>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Select Language</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowSelector(false)}>
              ✕
            </Button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant={currentLanguage === language.code ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleLanguageSelect(language.code)}
              >
                <span className="mr-3">{language.nativeName}</span>
                <span className="text-sm text-gray-500">({language.name})</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
