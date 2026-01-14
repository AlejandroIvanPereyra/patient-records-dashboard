import { useState } from "react"
import type { Patient } from "@/features/patients/types"

import { PatientFormModal } from "@/features/patients/components/PatientFormModal"
import { PatientList } from "@/features/patients/components/PatientList"

import { Stack } from "@/ui/Stack"
//import { Text } from "@/ui/Text"
import { Button } from "@/ui/Button"
import { Tabs } from "@/ui/Tabs"

import { useFavoritesStore } from "@/features/patients/hooks/useFavoritesStore"
import { usePatientsStore } from "@/features/patients/hooks/usePatientsStorage"

type TabKey = "all" | "favorites"

export function PatientsPage() {
    const [open, setOpen] = useState(false)
    const [editingPatient, setEditingPatient] = useState<Patient | undefined>()
    const [activeTab, setActiveTab] = useState<TabKey>("all")

    const patients = usePatientsStore((s) => s.patients)
    const favoriteIds = useFavoritesStore((s) => s.favoriteIds)

    const filteredPatients =
        activeTab === "favorites"
            ? patients.filter((p) => favoriteIds.includes(p.id))
            : patients

    const tabs = [
        { value: "all", label: "All patients" },
        {
            value: "favorites",
            label: `Favorites (${favoriteIds.length})`,
        },
    ] satisfies { value: TabKey; label: React.ReactNode }[]

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

    return (
        <div className="flex-1 bg-gray-50 min-h-screen">
            <Stack gap="lg" className="max-w-4xl mx-auto px-6 py-8">
                {/* Header */}
                <Stack gap="xs">
                    <h1 className="text-2xl font-bold text-black-900">
                        Patient Records
                    </h1>
                    <div className="flex items-center justify-between">
                        <Tabs
                            value={activeTab}
                            options={tabs}
                            onChange={setActiveTab}
                        />

                        <Button onClick={handleAddPatient}>
                            Add patient
                        </Button>
                    </div>
                </Stack>

                {/* List */}
                <PatientList
                    onEditPatient={handleEditPatient}
                    patients={activeTab === "favorites" ? filteredPatients : undefined}
                />
            </Stack>

            <PatientFormModal
                open={open}
                onClose={handleCloseModal}
                patient={editingPatient}
            />
        </div>
    )
}
