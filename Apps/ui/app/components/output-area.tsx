import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calculator, BarChart3, DollarSign, Loader2 } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

interface OutputAreaProps {
  messages: Message[]
  loading: boolean
}

// Function to extract quantitative analysis from AI response
function extractQuantitativeAnalysis(content: string): string {
  // Extract sentences with numbers, percentages, calculations, and financial metrics
  const sentences = content.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)

  const quantitativeSentences = sentences.filter((sentence) => {
    const hasNumbers = /\d/.test(sentence)
    const hasPercentages = /%/.test(sentence)
    const hasMathSymbols = /[+\-*/=<>]/.test(sentence)
    const hasFinancialMetrics = /\b(WACC|NPV|IRR|ROI|DCF|EBITDA|P\/E|EPS|USD|EUR|GBP|\$|€|£)\b/i.test(sentence)
    const hasCalculations = /\b(calculate|computation|formula|equation|result|total|sum)\b/i.test(sentence)

    return hasNumbers || hasPercentages || hasMathSymbols || hasFinancialMetrics || hasCalculations
  })

  return quantitativeSentences.length > 0 ? quantitativeSentences.join(". ").trim() + "." : content // Fallback to full content if no quantitative content detected
}

export function OutputArea({ messages, loading }: OutputAreaProps) {
  // Get only assistant messages for the output area
  const assistantMessages = messages.filter((message) => message.role === "assistant")

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Financial Analysis Output</h2>
        <p className="text-sm text-muted-foreground">Quantitative analysis, calculations, and financial models</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {assistantMessages.length === 0 && !loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Financial Analysis & Models</h3>
                <p className="text-muted-foreground">
                  Quantitative results, calculations, and financial metrics will appear here
                </p>
              </div>

              {/* Sample output cards that would appear */}
              <div className="mt-8 space-y-4 max-w-md">
                <Card className="opacity-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      WACC Calculation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">8.5%</p>
                    <p className="text-sm text-muted-foreground">Weighted Average Cost of Capital</p>
                  </CardContent>
                </Card>

                <Card className="opacity-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Valuation Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">NPV: $2.4M | IRR: 15.2% | Payback: 3.1 years</p>
                  </CardContent>
                </Card>

                <Card className="opacity-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Financial Ratios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">P/E: 18.5x | ROE: 12.3% | Debt/Equity: 0.45</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {loading && (
              <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Analyzing and calculating...</p>
              </div>
            )}

            {assistantMessages.map((message) => {
              const quantitativeContent = extractQuantitativeAnalysis(message.content)

              return (
                <Card key={message.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      Quantitative Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap font-mono text-sm bg-muted/50 p-3 rounded">
                        {quantitativeContent}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
