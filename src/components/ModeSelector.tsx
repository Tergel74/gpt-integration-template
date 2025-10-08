// components/ModeSelector.tsx
"use client";
import { Mode } from "../types/main";

export default function ModeSelector({
    mode,
    onChange,
}: {
    mode: Mode;
    onChange: (m: Mode) => void;
}) {
    const options: Mode[] = ["friend", "mentor", "developer"];
    return (
        <div className="flex gap-2 p-2 bg-white border-b">
            {options.map((opt) => (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    className={`px-4 py-2 rounded-xl ${
                        mode === opt ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    {opt[0].toUpperCase() + opt.slice(1)}
                </button>
            ))}
        </div>
    );
}
