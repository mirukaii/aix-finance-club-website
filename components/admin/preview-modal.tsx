import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

export function PreviewModal({ isOpen, onClose, title, content }: PreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">{title}</DialogTitle>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        </DialogHeader>
        <div className="mt-6 prose prose-invert max-w-none">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  )
}
