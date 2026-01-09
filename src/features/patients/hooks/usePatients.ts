import { useCustomQuery } from "@/features/patients/api/hooks/useCustomQuery"
import { getPatients } from "@/features/patients/api/patients.api"
import type { Patient } from "../types"

const QUERY_KEY = ["patients"]

export function usePatients() {
    return useCustomQuery<Patient[]>({
        queryKey: QUERY_KEY,
        queryFn: async () => {
            const response = await getPatients({ page: 1, limit: 20 })
            return response.data
        },
    })
}
