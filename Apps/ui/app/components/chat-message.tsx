type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

interface ChatMessageProps {
  message: Message
}

// Function to extract qualitative analysis from AI response
function extractQualitativeAnalysis(content: string): string {
  // This is a simple implementation - in a real app, you'd use more sophisticated parsing
  // For now, we'll extract sentences that don't contain numbers, percentages, or mathematical symbols
  const sentences = content.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)

  const qualitativeSentences = sentences.filter((sentence) => {
    const hasNumbers = /\d/.test(sentence)
    const hasPercentages = /%/.test(sentence)
    const hasMathSymbols = /[+\-*/=<>]/.test(sentence)
    const hasFinancialMetrics = /\b(WACC|NPV|IRR|ROI|DCF|EBITDA|P\/E|EPS)\b/i.test(sentence)

    // Keep sentences that don't have heavy quantitative content
    return !hasNumbers && !hasPercentages && !hasMathSymbols && !hasFinancialMetrics
  })

  // If no qualitative sentences found, return a summary
  if (qualitativeSentences.length === 0) {
    return "Analysis complete. See detailed calculations and metrics in the output panel."
  }

  return qualitativeSentences.join(". ").trim() + "."
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[90%] rounded-lg px-3 py-2 bg-primary text-primary-foreground">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    )
  }

  // For assistant messages, show only qualitative analysis
  const qualitativeContent = extractQualitativeAnalysis(message.content)

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] rounded-lg px-3 py-2 bg-muted text-foreground">
        <p className="text-sm">{qualitativeContent}</p>
      </div>
    </div>
  )
}
