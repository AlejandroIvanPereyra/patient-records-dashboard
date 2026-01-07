import { Stack } from "@/ui/Stack"
import { PatientCard } from "./PatientCard"
import type { Patient } from "../types"

type Props = {
    patients: Patient[]
}

export function PatientList({ patients }: Props) {
    if (patients.length === 0) {
        return null
    }

    return (
        <Stack gap="lg">
            {patients.map((patient) => (
                <PatientCard
                    key={patient.id}
                    patient={patient}
                />
            ))}
        </Stack>
    )
}
