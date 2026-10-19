import { useEffect, useState } from "preact/hooks";
import {
    applyColorMode,
    getStoredPreference,
    setStoredPreference,
    type ColorModePreference,
    type ResolvedColorMode,
} from "./colorMode";
import { useMediaQuery } from "./useMediaQuery";

export function useColorMode() {
    const [preference, setPreference] = useState<ColorModePreference>(getStoredPreference);
    const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

    const mode: ResolvedColorMode =
        preference === "system" ? (prefersDark ? "dark" : "light") : preference;

    useEffect(() => {
        applyColorMode(mode);
    }, [mode]);

    const setColorMode = (next: ColorModePreference) => {
        setStoredPreference(next);
        setPreference(next);
    };

    return { preference, setColorMode };
}
