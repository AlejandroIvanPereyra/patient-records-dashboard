// components/PatientFormModal.tsx
import { Modal } from "@/ui/Modal"
import { PatientForm } from "./PatientForm"
import { usePatientsStore } from "../hooks/usePatientsStorage"
import { useToast } from "@/ui/Toast"
import type { Patient } from "../types"
import type { PatientFormValues } from "../types"

type Props = {
    open: boolean
    onClose: () => void
    patient?: Patient
}

export function PatientFormModal({ open, onClose, patient }: Props) {
    const { addPatient, updatePatient } = usePatientsStore()
    const { showSuccess, showError, ToastComponent } = useToast()

    function handleSubmit(values: PatientFormValues) {
        try {
            // Convert optional website to string (empty string if null/undefined)
            const website = values.website ?? ""
            
            if (patient) {
                // Edit existing patient - preserve id, avatar, and createdAt
                updatePatient({
                    ...patient,
                    name: values.name,
                    description: values.description,
                    website,
                })
                showSuccess("Patient updated successfully!")
            } else {
                // Add new patient - generate id, avatar, and createdAt
                const newPatient: Patient = {
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.name}`,
                    name: values.name,
                    description: values.description,
                    website,
                }
                addPatient(newPatient)
                showSuccess("Patient added successfully!")
            }
            onClose()
        } catch (error) {
            showError(
                error instanceof Error
                    ? error.message
                    : "Failed to save patient. Please try again."
            )
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                title={patient ? "Edit patient" : "Add patient"}
            >
                <PatientForm
                    initialValues={patient}
                    onSubmit={handleSubmit}
                />
            </Modal>
            {ToastComponent}
        </>
    )
}
