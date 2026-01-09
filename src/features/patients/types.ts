export type Patient = {
    id: string
    createdAt: string
    name: string
    avatar: string
    description: string
    website?: string | null
}

export type PatientFormValues = {
    name: string
    description: string
    website?: string | null
}
