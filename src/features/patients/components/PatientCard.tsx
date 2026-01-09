import { useState } from "react"
import { Card } from "@/ui/Card"
import { Text } from "@/ui/Text"
import { Avatar } from "@/ui/Avatar"
import { Button } from "@/ui/Button"
import type { Patient } from "../types"

type Props = {
    patient: Patient
    onEdit?: (patient: Patient) => void
}

export function PatientCard({ patient, onEdit }: Props) {
    const [expanded, setExpanded] = useState(false)

    const toggleExpanded = () => {
        setExpanded((prev) => !prev)
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        onEdit?.(patient)
    }

    const truncatedDescription =
        patient.description.length > 150
            ? `${patient.description.slice(0, 150)}...`
            : patient.description

    return (
        <Card className="cursor-pointer transition-shadow duration-200 hover:shadow-lg">
            <div
                className="flex items-start gap-4 w-full"
                onClick={toggleExpanded}
            >
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Avatar
                        src={patient.avatar}
                        alt={patient.name}
                        size="md"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <Text
                            variant="title"
                            size="md"
                            className="font-semibold text-gray-900"
                        >
                            {patient.name}
                        </Text>

                        {/* Chevron */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`text-gray-400 transition-transform duration-300 ease-in-out ${expanded ? "rotate-180" : ""
                                }`}
                        >
                            <path
                                d="M6 8l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* Description (always visible) */}
                    <div className="text-sm text-gray-600 leading-relaxed">
                        <Text variant="muted" size="sm">
                            {expanded
                                ? patient.description
                                : truncatedDescription}
                        </Text>
                    </div>

                    {/* Animated expanded content */}
                    <div
                        className={`
                            overflow-hidden
                            transition-all
                            duration-300
                            ease-in-out
                            ${expanded
                                ? "max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0"
                            }
                        `}
                    >
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                            <div>
                                <span className="font-medium text-gray-700">
                                    Created:
                                </span>{" "}
                                {new Date(
                                    patient.createdAt
                                ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </div>

                            {patient.website && (
                                <div>
                                    <a
                                        href={patient.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Visit website →
                                    </a>
                                </div>
                            )}

                            {onEdit && (
                                <div className="pt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleEdit}
                                    >
                                        Edit Patient
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
