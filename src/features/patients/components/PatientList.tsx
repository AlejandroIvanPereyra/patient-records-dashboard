import { useEffect, useRef } from "react"
import { Stack } from "@/ui/Stack"
import { Text } from "@/ui/Text"
import { PatientCard } from "./PatientCard"
import { PatientCardSkeleton } from "./PatientCardSkeleton"
import { usePatientsInfinite } from "../hooks/usePatientsInfinite"
import { usePatientsStore } from "../hooks/usePatientsStorage"
import type { Patient } from "../types"

type Props = {
    patients?: Patient[]            // 👈 ahora es opcional
    onEditPatient?: (patient: Patient) => void
}

export function PatientList({ patients, onEditPatient }: Props) {
    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = usePatientsInfinite()

    const storePatients = usePatientsStore((s) => s.patients)

    // 👉 si vienen patients por props, la lista es "controlled"
    const list = patients ?? storePatients
    const enableInfinite = !patients

    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    // infinite scroll SOLO cuando usamos la lista completa
    useEffect(() => {
        if (!enableInfinite) return
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
    }, [enableInfinite, fetchNextPage, hasNextPage, isFetchingNextPage])

    // loading inicial SOLO para infinite
    if (enableInfinite && isLoading && list.length === 0) {
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

    if (isError && enableInfinite) {
        return <Text>Failed to load patients.</Text>
    }

    if (list.length === 0) {
        return (
            <Text variant="muted" size="sm">
                No patients found.
            </Text>
        )
    }

    return (
        <Stack gap="md" className="w-full">
            {list.map((patient) => (
                <PatientCard
                    key={patient.id}
                    patient={patient}
                    onEdit={onEditPatient}
                />
            ))}

            {/* Sentinel SOLO para infinite */}
            {enableInfinite && hasNextPage && (
                <div ref={loadMoreRef} className="py-4">
                    {isFetchingNextPage && (
                        <PatientCardSkeleton />
                    )}
                </div>
            )}
        </Stack>
    )
}
