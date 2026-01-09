import { useEffect } from "react"
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
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    return createPortal(
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div
                className={`${typeStyles[type]} rounded-lg px-4 py-3 shadow-lg min-w-[300px]`}
            >
                <Text size="sm" className="text-white">
                    {message}
                </Text>
            </div>
        </div>,
        document.body
    )
}
