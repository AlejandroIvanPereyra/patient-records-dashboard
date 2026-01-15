import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
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
    const [showScrollToTop, setShowScrollToTop] = useState(false)

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

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
            setShowScrollToTop(scrollY > 200)
        }

        // Check initial scroll position
        handleScroll()

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

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

            {/* Scroll to Top Button */}
            {showScrollToTop &&
                createPortal(
                    <button
                        onClick={handleScrollToTop}
                        className="fixed bottom-8 right-8 z-[100] rounded-full w-12 h-12 shadow-lg flex items-center justify-center transition-opacity duration-300 bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                        aria-label="Scroll to top"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 15.75l7.5-7.5 7.5 7.5"
                            />
                        </svg>
                    </button>,
                    document.body
                )}
        </div>
    )
}
