import { useState } from "react"
import { Card } from "@/ui/Card"
import { Stack } from "@/ui/Stack"
import { Avatar } from "@/ui/Avatar"
import { Text } from "@/ui/Text"
import { Button } from "@/ui/Button"
import type { Patient } from "../types"

type Props = {
    patient: Patient
}

export function PatientCard({ patient }: Props) {
    const [expanded, setExpanded] = useState(false)

    return (
        <Card>
            <Stack gap="md">
                {/* HEADER */}
                <Stack
                    direction="row"
                    align="center"
                    justify="between"
                >
                    <Stack direction="row" gap="md" align="center">
                        <Avatar
                            src={patient.avatar}
                            alt={patient.name}
                            size="md"
                        />

                        <Stack gap="xs">
                            <Text variant="title" size="lg">
                                {patient.name}
                            </Text>

                            <Text size="sm" color="muted">
                                {patient.description.slice(0, 80)}…
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpanded(v => !v)}
                    >
                        {expanded ? "Hide" : "View"}
                    </Button>
                </Stack>

                {/* DETAIL */}
                {expanded && (
                    <Stack gap="sm" className="pt-2 border-t border-gray-100">
                        <Text size="sm">{patient.description}</Text>

                        <Text variant="link" size="sm">
                            <a
                                href={patient.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit website
                            </a>
                        </Text>
                    </Stack>
                )}
            </Stack>
        </Card>
    )
}
