import { Card } from "../ui/Card"
import { Avatar } from "../ui/Avatar"
import { Button } from "../ui/Button"
import { Text } from "../ui/Text"
import { Stack } from "../ui/Stack"

export function UiPlaygroundPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-6 space-y-6">
            <Card>
                <Stack direction="row" gap="md">
                    <Avatar
                        src="https://i.pravatar.cc/150"
                        alt="Avatar"
                    />
                    <Stack>
                        <Text variant="title">UI Playground</Text>
                        <Button variant="primary">Primary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </Stack>
                </Stack>
            </Card>
        </main>
    )
}
