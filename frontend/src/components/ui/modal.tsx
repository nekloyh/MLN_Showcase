import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly children: React.ReactNode
  readonly title?: string
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  // Handle escape key
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
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-modal-backdrop">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in z-30"
        onClick={handleBackdropClick}
      />

      {/* Modal Container - Tăng kích thước tối đa */}
      <div className="relative w-full max-w-6xl max-h-[92vh] mx-4 bg-white rounded-xl shadow-2xl overflow-hidden animate-modal-slide-in transform-gpu z-40 border border-marx-red-light">
        
        {/* Animated Gradient Border Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-marx-red via-lenin-yellow to-marx-red opacity-20 animate-glow pointer-events-none z-0" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-marx-red-light bg-gradient-to-r from-marx-red/5 to-lenin-yellow/5 backdrop-blur-sm">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-balance bg-gradient-to-r from-marx-red to-lenin-yellow bg-clip-text text-transparent animate-title-glow pr-10">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-3 bg-marx-red hover:bg-marx-red-hover text-white rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 active:scale-95 shadow-lg group"
            aria-label="Đóng hộp thoại"
          >
            <X className="w-5 h-5 group-hover:drop-shadow-lg transition-all duration-300" />
          </button>
        </div>

        {/* Content - Tối ưu cho ảnh lớn */}
        <div className="relative overflow-y-auto max-h-[calc(92vh-100px)] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-full h-full p-6 animate-content-fade-in flex items-center justify-center">
            {/* Ảnh sẽ tự động chiếm toàn bộ không gian */}
            <div className="w-full h-full flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}