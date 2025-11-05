import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import FocusTrap from 'focus-trap-react'

interface ModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly children: React.ReactNode
  readonly title?: string
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

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
    <FocusTrap active={isOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center animate-modal-backdrop">
        {/* Backdrop (lighter) */}
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in z-30"
          onClick={handleBackdropClick}
          role="presentation" // Add role for accessibility
        />
        
        {/* Modal Container (lighter background) */}
        <div 
          ref={modalRef}
          className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white/95 border rounded-xl shadow-2xl overflow-hidden animate-modal-slide-in transform-gpu z-40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Animated border effect (behind content) */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-10 animate-glow pointer-events-none z-0" />
          
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between p-6 border-b bg-white/95 backdrop-blur-sm">
            {title && (
              <h2 id="modal-title" className="text-xl md:text-2xl font-semibold text-balance bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent animate-title-glow">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90 active:scale-95 group"
              aria-label="Đóng hộp thoại"
            >
              <X className="w-5 h-5 group-hover:drop-shadow-lg transition-all duration-300" />
            </button>
          </div>
          
          {/* Content */}
          <div className="relative overflow-y-auto max-h-[calc(90vh-80px)] bg-background/95 backdrop-blur-sm">
            <div className="p-6 animate-content-fade-in">
              {children}
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  )
}
