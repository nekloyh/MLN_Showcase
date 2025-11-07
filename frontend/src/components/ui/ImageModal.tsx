import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ImageModalProps {
  readonly isOpen: boolean
  readonly src: string
  readonly alt?: string
  readonly onClose: () => void
}

export default function ImageModal({ isOpen, src, alt = '', onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-in">
      {/* Backdrop đen full */}
      <div
        className="fixed inset-0 z-40 cursor-zoom-out"
        onClick={handleBackdropClick}
        aria-label="Đóng ảnh"
      />

      {/* Nút đóng - nhỏ gọn, góc trên phải */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 p-2.5 bg-marx-red/90 hover:bg-marx-red text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-90 active:scale-95 shadow-xl group"
        aria-label="Đóng ảnh"
      >
        <X className="w-5 h-5 group-hover:drop-shadow-lg" />
      </button>

      {/* Ảnh - FULL WIDTH & FULL HEIGHT */}
      <div className="relative w-screen h-screen flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain animate-modal-zoom-in"
          draggable={false}
          style={{ maxWidth: '100vw', maxHeight: '100vh' }}
        />
      </div>
    </div>
  )
}