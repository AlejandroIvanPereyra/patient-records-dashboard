import type { Patient } from "../types"

const API_URL = import.meta.env.VITE_PATIENTS_API_URL
if (!API_URL) {
    throw new Error("VITE_PATIENTS_API_URL environment variable is not defined")
}


type GetPatientsParams = {
    page?: number
    limit?: number
}

export type GetPatientsResponse = {
    data: Patient[]
    page: number
    totalPages: number
}

export async function getPatients({
    page = 1,
    limit = 10,
}: GetPatientsParams = {}): Promise<GetPatientsResponse> {
    const response = await fetch(
        `${API_URL}?page=${page}&limit=${limit}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch patients")
    }

    const data: Patient[] = await response.json()

    return {
        data,
        page,
        totalPages: 10,
    }
}
