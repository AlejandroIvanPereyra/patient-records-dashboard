import { useEffect } from "react"
import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import { Card } from "@/ui/Card"
import { Text } from "@/ui/Text"
import { Button } from "@/ui/Button"

type ModalProps = {
    open: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export function Modal({
    open,
    onClose,
    title,
    children,
}: ModalProps) {
    // Close on ESC
    useEffect(() => {
        if (!open) return

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose()
            }
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [open, onClose])

    if (!open) return null

    return createPortal(
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 flex min-h-full items-center justify-center p-4">
                <Card className="w-full max-w-lg">
                    {/* Header */}
                    {title && (
                        <div className="flex items-center justify-between mb-4">
                            {title && (
                                <Text variant="title" size="lg">
                                    {title}
                                </Text>
                            )}

                            <Button
                                variant="link"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                ✕
                            </Button>
                        </div>
                    )}

                    {/* Content */}
                    <div>{children}</div>
                </Card>
            </div>
        </div>,
        document.body
    )
}
