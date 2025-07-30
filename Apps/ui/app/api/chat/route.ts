import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // You can add financial context here if needed
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system:
      "You are a financial AI assistant specialized in corporate finance, investment analysis, and financial markets. Provide clear, accurate information and analysis on financial topics.",
  })

  return result.toDataStreamResponse()
}
