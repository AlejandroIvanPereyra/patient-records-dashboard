// src/ui/Stack/Stack.tsx
import type { ReactNode } from "react"

type StackProps = {
    children: ReactNode
    gap?: "xs" | "sm" | "md" | "lg"
    direction?: "row" | "column"
    align?: "start" | "center" | "end" | "stretch"
    justify?: "start" | "center" | "end" | "between"
    className?: string
}

const gapMap = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
}

const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
}

const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
}

export function Stack({
    children,
    gap = "md",
    direction = "column",
    align = "stretch",
    justify = "start",
    className = "",
}: StackProps) {
    return (
        <div
            className={`flex ${direction === "column" ? "flex-col" : "flex-row"
                } ${gapMap[gap]} ${alignMap[align]} ${justifyMap[justify]} ${className}`}
        >
            {children}
        </div>
    )
}
