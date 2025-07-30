"use client"

import type React from "react"
import type { HTMLFormElement } from "react"
import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "./components/chat-message"
import { OutputArea } from "./components/output-area"
import { DocumentDropdown } from "./components/document-dropdown"

export default function FinancialCopilot() {
  const [loading, setLoading] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    onResponse: () => {
      setLoading(false)
    },
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    handleSubmit(e)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Chat Interface */}
      <div className="flex flex-col w-80 h-full border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-3">Chat</h2>
          <DocumentDropdown />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center text-sm">Your messages will appear here</p>
            </div>
          ) : (
            messages.map((message) => <ChatMessage key={message.id} message={message} />)
          )}
          {loading && (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Thinking...</p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={onSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about financial concepts..."
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
            </Button>
          </form>
        </div>
      </div>

      {/* Output Area */}
      <OutputArea messages={messages} loading={loading} />
    </div>
  )
}
