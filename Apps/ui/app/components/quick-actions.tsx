"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface QuickAction {
  icon: LucideIcon
  text: string
  prompt: string
}

interface QuickActionsProps {
  prompts: QuickAction[]
  onSelect: (prompt: string) => void
}

export function QuickActions({ prompts, onSelect }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Get started with common financial analysis tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {prompts.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              onClick={() => onSelect(action.prompt)}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{action.text}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
