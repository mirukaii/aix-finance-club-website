'use client'

import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  currentImageUrl?: string | null
  label?: string
  accepting?: string
}

export function ImageUploader({ onUpload, currentImageUrl, label = 'Upload Image', accepting = 'image/*' }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)

  const handleUpload = useCallback(async (file: File) => {
    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')
      const { url } = await response.json()

      setPreview(url)
      onUpload(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }, [onUpload])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      
      {preview ? (
        <div className="relative rounded-lg overflow-hidden bg-secondary">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => {
              setPreview(null)
              onUpload('')
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="relative rounded-lg border-2 border-dashed border-border hover:border-accent/50 transition-colors p-8 text-center cursor-pointer bg-secondary/50 hover:bg-secondary/75"
        >
          <input
            type="file"
            accept={accepting}
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground mb-1">Drag & drop or click</p>
          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
          {isUploading && <p className="text-xs text-accent mt-2">Uploading...</p>}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
