import type { ReactNode } from "react"

type BaseProps = {
    children: ReactNode
    className?: string
}

export function Card({ children, className = "" }: BaseProps) {
    return (
        <div
            className={`
        rounded-xl
        bg-white
        p-6
        shadow-sm
        transition-all
        border
        border-gray-200
        ${className}
      `}
        >
            {children}
        </div>
    )
}

export function CardHeader({ children, className = "" }: BaseProps) {
    return (
        <div className={`flex items-start justify-between gap-4 ${className}`}>
            {children}
        </div>
    )
}

export function CardContent({ children, className = "" }: BaseProps) {
    return (
        <div className={`mt-4 ${className}`}>
            {children}
        </div>
    )
}
