import { useState } from "react"
import * as yup from "yup"
import { ValidationError } from 'yup'
import { Button } from "@/ui/Button"
import type { PatientFormValues } from "../types"

/* =========================
   Validation schema (inline)
========================= */

const patientSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),

    description: yup
        .string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),

    website: yup
        .string()
        .url("Must be a valid URL")
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .optional(),
})

/* =========================
   Component
========================= */

type Props = {
    initialValues?: Partial<PatientFormValues> | { name?: string; description?: string; website?: string }
    onSubmit: (values: PatientFormValues) => void
}

export function PatientForm({ initialValues, onSubmit }: Props) {
    const [values, setValues] = useState<PatientFormValues>({
        name: initialValues?.name ?? "",
        description: initialValues?.description ?? "",
        website: initialValues?.website ?? "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const validated = await patientSchema.validate(values, {
                abortEarly: false,
                stripUnknown: true,
            })

            setErrors({})
            onSubmit(validated)
        } catch (err: unknown) {
            const formErrors: Record<string, string> = {}

            if (err instanceof ValidationError) {
                err.inner.forEach((e) => {
                    if (e.path) {
                        formErrors[e.path] = e.message
                    }
                })
            }

            setErrors(formErrors)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
                <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium"
                >
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                />
            </div>
            {/* Description */}
            <div>
                <label
                    htmlFor="description"
                    className="mb-1 block text-sm font-medium"
                >
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded border px-3 py-2"
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
            </div>

            {/* Website */}
            <div>
                <label
                    htmlFor="website"
                    className="mb-1 block text-sm font-medium"
                >
                    Website
                </label>
                <input
                    id="website"
                    name="website"
                    type="url"
                    value={values.website ?? ""}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                />
                {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
    )
}
