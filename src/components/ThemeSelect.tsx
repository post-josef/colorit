import { Monitor, Moon, Sun } from "lucide-preact";
import type { ColorModePreference } from "../theme/colorMode";
import { useColorMode } from "../theme/useColorMode";
import { SegmentedControl, type SegmentOption } from "./SegmentedControl";

const options: SegmentOption<ColorModePreference>[] = [
    { value: "dark", tooltip: "Dark", label: "Dark theme", icon: <Moon size={18} strokeWidth={2} aria-hidden /> },
    { value: "light", tooltip: "Light", label: "Light theme", icon: <Sun size={18} strokeWidth={2} aria-hidden /> },
    {
        value: "system",
        tooltip: "System",
        label: "System theme",
        icon: <Monitor size={18} strokeWidth={2} aria-hidden />,
    },
];

export function ThemeSelect() {
    const { preference, setColorMode } = useColorMode();

    return (
        <SegmentedControl
            variant="inline"
            aria-label="Color theme"
            value={preference}
            options={options}
            onChange={setColorMode}
        />
    );
}
