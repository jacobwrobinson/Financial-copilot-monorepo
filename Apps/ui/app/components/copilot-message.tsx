import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

interface CopilotMessageProps {
  message: Message
}

export function CopilotMessage({ message }: CopilotMessageProps) {
  const isUser = message.role === "user"

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%]">
          <Badge variant="outline" className="mb-2">
            Your Request
          </Badge>
          <Card>
            <CardContent className="p-3">
              <p className="text-sm">{message.content}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
        🤖 Analysis Complete
      </Badge>
      <Card>
        <CardContent className="p-4">
          <div className="prose prose-sm max-w-none">
            <p>{message.content}</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="outline" className="text-xs">
              Generated in 2.3s
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
