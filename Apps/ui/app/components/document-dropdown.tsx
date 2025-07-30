"use client"

import { useState } from "react"
import { FileText, FolderOpen, ChevronDown, Upload, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

export function DocumentDropdown() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  const handleDocumentSelect = (docTitle: string) => {
    setSelectedDocument(docTitle)
  }

  const handleFileUpload = () => {
    // Handle file upload logic here
    console.log("File upload clicked")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 px-2 text-sm text-muted-foreground hover:text-foreground">
          <Paperclip className="h-4 w-4 mr-1" />
          File select/upload
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="start">
        <DropdownMenuItem onClick={handleFileUpload} className="flex items-center">
          <Upload className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Upload new file</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Available Documents</DropdownMenuLabel>
        {documents.map((doc) => (
          <DropdownMenuItem key={doc.id} onClick={() => handleDocumentSelect(doc.title)} className="flex items-center">
            {doc.type === "book" ? (
              <FolderOpen className="h-4 w-4 mr-2 text-muted-foreground" />
            ) : (
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            )}
            <span className="truncate">{doc.title}</span>
          </DropdownMenuItem>
        ))}
        {selectedDocument && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className="text-xs text-muted-foreground">
              Selected: {selectedDocument}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
