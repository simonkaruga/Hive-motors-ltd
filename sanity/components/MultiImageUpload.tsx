import React, { useCallback, useRef, useState } from 'react'
import { useClient, insert, PatchEvent } from 'sanity'
import type { ArrayOfObjectsInputProps } from 'sanity'

function generateKey() {
  return Math.random().toString(36).slice(2, 10)
}

/**
 * Compresses an image file using the Canvas API before upload.
 * - Scales down anything wider than 2400px
 * - Re-encodes as JPEG at 82% quality
 * - Falls back to the original file if compression somehow makes it larger
 */
async function compressImage(file: File, maxWidth = 2400, quality = 0.82): Promise<File> {
  return new Promise(resolve => {
    const img = document.createElement('img')
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      let { width, height } = img

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        blob => {
          if (!blob || blob.size >= file.size) {
            resolve(file) // original is already smaller — keep it
            return
          }
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
            type: 'image/jpeg',
            lastModified: Date.now(),
          }))
        },
        'image/jpeg',
        quality,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(file) // fallback to original on error
    }

    img.src = objectUrl
  })
}

export function MultiImageUpload(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })

  const handleFiles = useCallback(
    async (files: FileList) => {
      const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'))
      if (!fileArray.length) return

      setUploading(true)
      setProgress({ done: 0, total: fileArray.length })

      try {
        const uploaded: Record<string, unknown>[] = []

        for (let i = 0; i < fileArray.length; i++) {
          // Compress before uploading — shrinks large phone photos from ~8MB → ~300KB
          const compressed = await compressImage(fileArray[i])
          const asset = await client.assets.upload('image', compressed, {
            filename: compressed.name,
          })
          uploaded.push({
            _type: 'image',
            _key: generateKey(),
            asset: { _type: 'reference', _ref: asset._id },
          })
          setProgress({ done: i + 1, total: fileArray.length })
        }

        props.onChange(PatchEvent.from(insert(uploaded, 'after', [-1])))
      } catch (err) {
        console.error('Upload error:', err)
      } finally {
        setUploading(false)
        setProgress({ done: 0, total: 0 })
        if (inputRef.current) inputRef.current.value = ''
      }
    },
    [client, props],
  )

  const label = uploading
    ? `Uploading ${progress.done} of ${progress.total} photo${progress.total > 1 ? 's' : ''}…`
    : '📷  Select Photos (you can pick many at once)'

  return (
    <div>
      {/* ── Multi-upload button ── */}
      <div style={{ marginBottom: 16 }}>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => e.target.files && handleFiles(e.target.files)}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '12px 20px',
            background: uploading ? '#e5e7eb' : '#DA1D17',
            color: uploading ? '#6b7280' : '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {label}
        </button>

        {/* Progress bar */}
        {uploading && progress.total > 0 && (
          <div
            style={{
              marginTop: 8,
              height: 6,
              background: '#e5e7eb',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.round((progress.done / progress.total) * 100)}%`,
                background: '#DA1D17',
                borderRadius: 99,
                transition: 'width 0.2s',
              }}
            />
          </div>
        )}

        <p style={{ color: '#6b7280', fontSize: 12, marginTop: 6 }}>
          Tip: Hold <strong>Ctrl</strong> (Windows) or <strong>⌘ Cmd</strong> (Mac) to select
          multiple photos at once. The first photo in the list will be the cover image.
        </p>
      </div>

      {/* ── Existing Sanity array input (shows uploaded grid + reorder) ── */}
      {props.renderDefault(props)}
    </div>
  )
}
