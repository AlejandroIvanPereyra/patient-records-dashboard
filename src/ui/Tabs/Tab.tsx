import type { ReactNode } from "react"

type TabOption<T extends string> = {
    value: T
    label: ReactNode
}

type TabsProps<T extends string> = {
    value: T
    options: TabOption<T>[]
    onChange: (value: T) => void
}

export function Tabs<T extends string>({
    value,
    options,
    onChange,
}: TabsProps<T>) {
    return (
        <div className="flex gap-2">
            {options.map((option) => {
                const active = option.value === value

                return (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={[
                            "px-3 py-1.5 rounded-md text-sm font-medium transition",
                            active
                                ? "bg-gray-900 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        ].join(" ")}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}
