import { Stack } from "@/ui/Stack"

export function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 min-h-screen flex flex-col">
            <Stack gap="lg" className="p-6">
                {/* Avatar */}
                <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">A</span>
                    </div>
                </div>

                {/* Navigation items */}
                <Stack gap="md" className="mt-8">
                    <NavItem text="Dashboard" />
                    <NavItem text="Patients" active />
                    <NavItem text="Appointments" />
                    <NavItem text="Records" />
                    <NavItem text="Settings" />
                </Stack>
            </Stack>
        </div>
    )
}

function NavItem({ text, active = false }: { text: string; active?: boolean }) {
    return (
        <div
            className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                active
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
        >
            {text}
        </div>
    )
}
