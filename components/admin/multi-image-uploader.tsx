'use client'

import { useState, useCallback } from 'react'
import { Upload, X, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MultiImageUploaderProps {
  onUploadUrls: (urls: string[]) => void
  currentUrls?: string[]
  label?: string
}

export function MultiImageUploader({ onUploadUrls, currentUrls = [], label = 'Upload Slides' }: MultiImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>(currentUrls)

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

      const newImages = [...images, url]
      setImages(newImages)
      onUploadUrls(newImages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }, [images, onUploadUrls])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onUploadUrls(newImages)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground">{label}</label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          {images.map((url, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden bg-secondary group">
              <img src={url} alt={`Slide ${index + 1}`} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2">
                <GripVertical className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="opacity-0 group-hover:opacity-100"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative rounded-lg border-2 border-dashed border-border hover:border-accent/50 transition-colors p-8 text-center cursor-pointer bg-secondary/50 hover:bg-secondary/75"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium text-foreground mb-1">Add slide ({images.length})</p>
        <p className="text-xs text-muted-foreground">Drag & drop or click</p>
        {isUploading && <p className="text-xs text-accent mt-2">Uploading...</p>}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
