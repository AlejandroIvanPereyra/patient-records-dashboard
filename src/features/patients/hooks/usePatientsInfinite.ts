import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getPatients } from "@/features/patients/api/patients.api"
import { usePatientsStore } from "./usePatientsStorage"

const QUERY_KEY = ["patients", "infinite"]

export function usePatientsInfinite() {
    const appendPatients = usePatientsStore(
        (s) => s.appendPatients
    )

    const query = useInfiniteQuery({
        queryKey: QUERY_KEY,
        queryFn: ({ pageParam }) =>
            getPatients({ page: pageParam, limit: 10 }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.totalPages
                ? lastPage.page + 1
                : undefined,
    })

    /**
     * ✅ side-effect explícito (v5 way)
     * se ejecuta SOLO cuando llegan páginas nuevas
     */
    useEffect(() => {
        if (!query.data) return

        const lastPage =
            query.data.pages[query.data.pages.length - 1]

        appendPatients(lastPage.data)
    }, [query.data, appendPatients])

    return query
}
