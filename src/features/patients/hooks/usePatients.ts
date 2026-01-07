import { useCustomQuery } from "../api/hooks/useCustomQuery"
import { fetchPatients } from "../api/patients.api"
import type { Patient } from "../types"

const QUERY_KEY = ["patients"]

export function usePatients() {
    return useCustomQuery<Patient[]>({
        queryKey: QUERY_KEY,
        queryFn: fetchPatients,
    })
}
