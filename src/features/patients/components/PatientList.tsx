import { useEffect, useRef } from "react"
import { Stack } from "@/ui/Stack"
import { Text } from "@/ui/Text"
import { PatientCard } from "./PatientCard"
import { PatientCardSkeleton } from "./PatientCardSkeleton"
import { usePatientsInfinite } from "../hooks/usePatientsInfinite"
import { usePatientsStore } from "../hooks/usePatientsStorage"
import type { Patient } from "../types"

type Props = {
    onEditPatient?: (patient: Patient) => void
}

export function PatientList({ onEditPatient }: Props) {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = usePatientsInfinite()

    const patients = usePatientsStore((s) => s.patients)

    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    // infinite scroll observer
    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage()
                }
            },
            { rootMargin: "600px" }
        )

        observer.observe(loadMoreRef.current)
        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    if (isLoading && patients.length === 0) {
        return (
            <Stack gap="md" className="w-full">
                {Array.from({ length: 4 }).map((_, i) => (
                    <PatientCardSkeleton
                        key={i}
                        variant="shimmer"
                    />
                ))}
            </Stack>
        )
    }

    if (isError) {
        return <Text>Failed to load patients.</Text>
    }

    return (
        <Stack gap="md" className="w-full">
            {patients.map((patient) => (
                <PatientCard
                    key={patient.id}
                    patient={patient}
                    onEdit={onEditPatient}
                />
            ))}

            {hasNextPage && (
                <div ref={loadMoreRef} className="py-4">
                    {isFetchingNextPage && (
                        <PatientCardSkeleton />
                    )}
                </div>
            )}
        </Stack>
    )
}
