type SkeletonProps = {
    width?: string
    height?: string
    radius?: "sm" | "md" | "lg"
    variant?: "shimmer" | "pulse"
    className?: string
}

const radiusMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-xl",
}

export function Skeleton({
    width = "w-full",
    height = "h-4",
    radius = "md",
    variant = "pulse",
    className = "",
}: SkeletonProps) {
    return (
        <div
            className={[
                "bg-gray-200",
                width,
                height,
                radiusMap[radius],
                variant === "shimmer" && "animate-shimmer",
                variant === "pulse" && "animate-pulse",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        />
    )
}
