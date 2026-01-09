import { Card } from "@/ui/Card"
import { Skeleton } from "@/ui/Skeleton"

type Props = {
    variant?: "shimmer" | "pulse"
}

export function PatientCardSkeleton({
    variant = "pulse",
}: Props) {
    return (
        <Card>
            <div className="flex items-start gap-4 w-full">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Skeleton
                        width="w-10"
                        height="h-10"
                        radius="lg"
                        variant={variant}
                    />
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <Skeleton
                            width="w-40"
                            height="h-4"
                            variant={variant}
                        />

                        {/* Chevron placeholder */}
                        <Skeleton
                            width="w-5"
                            height="h-5"
                            radius="sm"
                            variant={variant}
                        />
                    </div>

                    {/* Description lines */}
                    <div className="space-y-2">
                        <Skeleton
                            height="h-3"
                            variant={variant}
                        />
                        <Skeleton
                            height="h-3"
                            width="w-5/6"
                            variant={variant}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}
