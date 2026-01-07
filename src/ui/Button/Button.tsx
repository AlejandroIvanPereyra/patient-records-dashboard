// src/ui/Button/Button.tsx
import type { ReactNode, ButtonHTMLAttributes } from "react"

type ButtonProps = {
    children: ReactNode
    variant?: "primary" | "secondary" | "ghost" | "link"
    size?: "sm" | "md"
} & ButtonHTMLAttributes<HTMLButtonElement>

const variantMap = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100",
    link: "text-blue-600 hover:underline p-0",
}

const sizeMap = {
    sm: "text-sm px-2 py-1 rounded",
    md: "text-base px-4 py-2 rounded-md",
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={`${variantMap[variant]} ${sizeMap[size]} ${className}`}
        >
            {children}
        </button>
    )
}
