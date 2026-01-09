type StatusBadgeProps = {
    status: "stable" | "recovering" | "critical"
}

const statusStyles = {
    stable: "bg-green-100 text-green-700",
    recovering: "bg-blue-100 text-blue-700",
    critical: "bg-red-100 text-red-700",
}

export function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span
            className={`px-2 py-1 rounded-md text-xs font-medium lowercase ${statusStyles[status]}`}
        >
            {status}
        </span>
    )
}
