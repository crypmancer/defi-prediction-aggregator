import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 5000) => {
      const id = Math.random().toString(36).substring(2, 9)
      const toast: Toast = { id, message, type, duration }

      setToasts((prev) => [...prev, toast])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }
    },
    [removeToast]
  )

  const success = useCallback(
    (message: string, duration?: number) => showToast(message, 'success', duration),
    [showToast]
  )

  const error = useCallback(
    (message: string, duration?: number) => showToast(message, 'error', duration),
    [showToast]
  )

  const info = useCallback(
    (message: string, duration?: number) => showToast(message, 'info', duration),
    [showToast]
  )

  const warning = useCallback(
    (message: string, duration?: number) => showToast(message, 'warning', duration),
    [showToast]
  )

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[]
  removeToast: (id: string) => void
}) {
  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 flex flex-col gap-2 w-full sm:w-auto sm:max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  )
}

function ToastItem({
  toast,
  removeToast,
}: {
  toast: Toast
  removeToast: (id: string) => void
}) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  }

  const colors = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: 'text-green-600 dark:text-green-400',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: 'text-red-600 dark:text-red-400',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-600 dark:text-blue-400',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: 'text-yellow-600 dark:text-yellow-400',
    },
  }

  const Icon = icons[toast.type]
  const color = colors[toast.type]

  return (
    <div
      className={`
        pointer-events-auto
        ${color.bg}
        ${color.border}
        border
        rounded-lg
        shadow-lg
        p-4
        flex
        items-start
        gap-3
        animate-slide-in-right
        transition-all
        duration-300
      `}
      role="alert"
    >
      <Icon className={`h-5 w-5 ${color.icon} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${color.text}`}>{toast.message}</p>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className={`
          flex-shrink-0
          ${color.icon}
          hover:opacity-70
          transition-opacity
          p-1
          rounded
        `}
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
