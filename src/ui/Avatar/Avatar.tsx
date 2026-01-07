type AvatarProps = {
    src: string
    alt: string
    size?: "sm" | "md" | "lg"
}

const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
}

export function Avatar({ src, alt, size = "md" }: AvatarProps) {
    return (
        <img
            src={src}
            alt={alt}
            className={`rounded-full object-cover ${sizes[size]}`}
        />
    )
}
