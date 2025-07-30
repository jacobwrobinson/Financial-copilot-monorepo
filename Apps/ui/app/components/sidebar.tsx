import { FileText, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock financial documents
const documents = [
  { id: 1, title: "Principles of Corporate Finance", type: "book" },
  { id: 2, title: "Case Studies in Finance", type: "book" },
  { id: 3, title: "Financial Statement Analysis", type: "document" },
  { id: 4, title: "Investment Banking Overview", type: "document" },
  { id: 5, title: "Valuation Methods", type: "document" },
  { id: 6, title: "Risk Management Strategies", type: "document" },
  { id: 7, title: "Portfolio Theory", type: "document" },
  { id: 8, title: "Market Efficiency", type: "document" },
]

export function Sidebar() {
  return (
    <div className="w-64 h-full flex flex-col bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Financial Documents</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {documents.map((doc) => (
            <Button key={doc.id} variant="ghost" className="w-full justify-start mb-1 text-sm font-normal">
              {doc.type === "book" ? (
                <FolderOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              ) : (
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              )}
              <span className="truncate">{doc.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <h3 className="text-sm font-medium mb-2">Context Snippets</h3>
        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
          <p className="mb-1">From: Principles of Corporate Finance</p>
          <p>
            "...the weighted average cost of capital (WACC) is calculated by weighting the cost of each capital
            component proportionately..."
          </p>
        </div>
      </div>
    </div>
  )
}
