// src/ui/Text/Text.tsx
import type { ReactNode } from "react"

type TextProps = {
    children: ReactNode
    variant?: "body" | "title" | "link"
    size?: "sm" | "md" | "lg"
    color?: "default" | "muted"
    className?: string
}

const variantMap = {
    body: "",
    title: "font-semibold",
    link: "text-blue-600 hover:underline",
}

const sizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
}

const colorMap = {
    default: "text-gray-900",
    muted: "text-gray-500",
}

export function Text({
    children,
    variant = "body",
    size = "md",
    color = "default",
    className = "",
}: TextProps) {
    return (
        <p
            className={`${variantMap[variant]} ${sizeMap[size]} ${colorMap[color]} ${className}`}
        >
            {children}
        </p>
    )
}
