import { PatientList } from "@/features/patients/components/PatientList"
import { usePatients } from "@/features/patients/hooks/usePatients"
import { Stack } from "@/ui/Stack"
import { Text } from "@/ui/Text"

export function PatientsPage() {
    const { data: patients, isLoading, isError } = usePatients()

    if (isLoading) {
        return (
            <Stack align="center" justify="center">
                <Text>Loading patients...</Text>
            </Stack>
        )
    }

    if (isError) {
        return (
            <Stack align="center" justify="center">
                <Text>Something went wrong while loading patients.</Text>
            </Stack>
        )
    }

    if (!patients || patients.length === 0) {
        return (
            <Stack align="center" justify="center">
                <Text>No patients found.</Text>
            </Stack>
        )
    }

    return (
        <Stack gap="lg">
            <PatientList patients={patients} />
        </Stack>
    )
}
