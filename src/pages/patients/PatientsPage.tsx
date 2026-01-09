import { PatientFormModal } from "@/features/patients/components/PatientFormModal"
import { PatientList } from "@/features/patients/components/PatientList"
import { Stack } from "@/ui/Stack"
import { Text } from "@/ui/Text"
import { Button } from "@/ui/Button"
import { useState } from "react"
import type { Patient } from "@/features/patients/types"

export function PatientsPage() {
    const [open, setOpen] = useState(false)
    const [editingPatient, setEditingPatient] = useState<Patient | undefined>(
        undefined
    )


    /* if (isLoading) {
         return (
             <Stack align="center" justify="center" className="min-h-screen">
                 <Text>Loading patients...</Text>
             </Stack>
         )
     }*/

    const handleAddPatient = () => {
        setEditingPatient(undefined)
        setOpen(true)
    }

    const handleEditPatient = (patient: Patient) => {
        setEditingPatient(patient)
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
        setEditingPatient(undefined)
    }

    /*  if (!patients || patients.length === 0) {
          return (
              <Stack align="center" justify="center" className="min-h-screen">
                  <Text>No patients found.</Text>
              </Stack>
          )
      }*/

    return (
        <div className="flex-1 bg-gray-50 min-h-screen">
            <Stack gap="lg" className="max-w-4xl mx-auto px-6 py-8">
                {/* Page header */}
                <Stack gap="xs">
                    <Text
                        variant="title"
                        size="lg"
                        className="text-2xl font-bold text-gray-900"
                    >
                        Patient Records
                    </Text>
                    <Text variant="muted" size="sm" className="text-gray-600">
                        Click on any patient card to view detailed information
                    </Text>
                    <Button onClick={handleAddPatient}>Add patient</Button>
                    <PatientFormModal
                        open={open}
                        onClose={handleCloseModal}
                        patient={editingPatient}
                    />
                </Stack>

                {/* List */}
                <PatientList onEditPatient={handleEditPatient} />
            </Stack>
        </div>
    )
}
