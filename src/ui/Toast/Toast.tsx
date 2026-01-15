import { useEffect, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { Text } from "@/ui/Text"

export type ToastType = "success" | "error" | "info"

type ToastProps = {
    message: string
    type: ToastType
    onClose: () => void
    duration?: number
}

const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
}

export function Toast({
    message,
    type,
    onClose,
    duration = 3000,
}: ToastProps) {
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = useCallback(() => {
        setIsClosing(true)
        // Wait for animation to complete before calling onClose
        setTimeout(() => {
            onClose()
        }, 300) // Match animation duration
    }, [onClose])

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, handleClose])

    return createPortal(
        <div className={`fixed top-4 right-4 z-50 ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}>
            <div
                className={`${typeStyles[type]} rounded-lg px-4 py-3 shadow-lg min-w-[300px] flex items-start justify-between gap-3`}
            >
                <Text size="sm" className="text-white flex-1">
                    {message}
                </Text>
                <button
                    onClick={handleClose}
                    className="text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded p-1 transition-opacity"
                    aria-label="Close toast"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>,
        document.body
    )
}
