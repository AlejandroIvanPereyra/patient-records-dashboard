import { useState, useCallback } from "react"
import { Toast, type ToastType } from "./Toast"
import type { JSX } from "react"

type ToastState = {
    message: string
    type: ToastType
} | null

type UseToastReturn = {
    showToast: (message: string, type?: ToastType) => void
    showSuccess: (message: string) => void
    showError: (message: string) => void
    ToastComponent: JSX.Element | null
}

export function useToast(): UseToastReturn {
    const [toast, setToast] = useState<ToastState>(null)

    const showToast = useCallback(
        (message: string, type: ToastType = "info") => {
            setToast({ message, type })
        },
        []
    )

    const showSuccess = useCallback(
        (message: string) => showToast(message, "success"),
        [showToast]
    )

    const showError = useCallback(
        (message: string) => showToast(message, "error"),
        [showToast]
    )

    const closeToast = useCallback(() => {
        setToast(null)
    }, [])

    const ToastComponent = toast ? (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
        />
    ) : null

    return {
        showToast,
        showSuccess,
        showError,
        ToastComponent,
    }
}
