import type { Patient } from "../types"

const API_URL =
    "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users"

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
