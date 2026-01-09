import type { Patient } from "../types"

export function mergePatients(
    apiPatients: Patient[],
    localPatients: Patient[]
): Patient[] {
    const localMap = new Map(
        localPatients.map((patient) => [patient.id, patient])
    )

    const merged = apiPatients.map(
        (patient) => localMap.get(patient.id) ?? patient
    )

    const newLocalPatients = localPatients.filter(
        (patient) =>
            !apiPatients.some((api) => api.id === patient.id)
    )

    return [...newLocalPatients, ...merged]
}
