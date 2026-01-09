import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Patient } from "../types"

type PatientsState = {
    patients: Patient[]
    appendPatients: (incoming: Patient[]) => void
    addPatient: (patient: Patient) => void
    updatePatient: (patient: Patient) => void
    reset: () => void
}

const STORAGE_KEY = "patient-records-local-storage"

export const usePatientsStore = create<PatientsState>()(
    persist(
        (set) => ({
            patients: [],

            /**
             * Append-only:
             * - agrega solo los pacientes nuevos
             * - nunca reordena
             * - nunca reconstruye la lista completa
             */
            appendPatients: (incoming) =>
                set((state) => {
                    if (incoming.length === 0) return state

                    const existingIds = new Set(
                        state.patients.map((p) => p.id)
                    )

                    const newPatients = incoming.filter(
                        (p) => !existingIds.has(p.id)
                    )

                    if (newPatients.length === 0) return state

                    return {
                        patients: [...state.patients, ...newPatients],
                    }
                }),

            addPatient: (patient) =>
                set((state) => ({
                    patients: [patient, ...state.patients],
                })),

            updatePatient: (updatedPatient) =>
                set((state) => ({
                    patients: state.patients.map((p) =>
                        p.id === updatedPatient.id ? updatedPatient : p
                    ),
                })),

            reset: () => set({ patients: [] }),
        }),
        {
            name: STORAGE_KEY,
        }
    )
)
