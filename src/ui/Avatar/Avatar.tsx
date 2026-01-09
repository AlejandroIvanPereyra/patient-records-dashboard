import { useState } from "react"

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

function PersonIconPlaceholder({ size }: { size: string }) {
    return (
        <div
            className={`${size} rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center`}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
            >
                <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                />
                <path
                    d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    )
}

export function Avatar({ src, alt, size = "md" }: AvatarProps) {
    const [imageError, setImageError] = useState(false)

    if (imageError) {
        return <PersonIconPlaceholder size={sizes[size]} />
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`rounded-full object-cover ${sizes[size]} border border-gray-200`}
            onError={() => setImageError(true)}
        />
    )
}
