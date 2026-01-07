import type { Patient } from "../types"

const API_URL = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users"

export async function fetchPatients(): Promise<Patient[]> {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error("Failed to fetch patients")
    }

    return response.json()
}
