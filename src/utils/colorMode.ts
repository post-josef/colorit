import { useEffect, useState } from "preact/hooks";
import { useSyncExternalStore } from "preact/compat";

export type ColorModePreference = "system" | "light" | "dark";
export type ResolvedColorMode = "light" | "dark";

const STORAGE_KEY = "colorit-color-mode";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function storage(): Storage | null {
    try {
        return localStorage;
    } catch {
        return null;
    }
}

export function getStoredPreference(): ColorModePreference {
    const value = storage()?.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark" || value === "system") return value;
    return "system";
}

export function setStoredPreference(preference: ColorModePreference): void {
    storage()?.setItem(STORAGE_KEY, preference);
}

function usePrefersDark(): boolean {
    return useSyncExternalStore(
        (onChange) => {
            const media = matchMedia(DARK_QUERY);
            media.addEventListener("change", onChange);
            return () => media.removeEventListener("change", onChange);
        },
        () => matchMedia(DARK_QUERY).matches,
    );
}

export function resolveColorMode(
    preference: ColorModePreference,
    prefersDark = matchMedia(DARK_QUERY).matches,
): ResolvedColorMode {
    if (preference === "light" || preference === "dark") return preference;
    return prefersDark ? "dark" : "light";
}

export function applyColorMode(mode: ResolvedColorMode): void {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
}

export function bootstrapColorMode(): void {
    applyColorMode(resolveColorMode(getStoredPreference()));
}

export function useColorMode() {
    const [preference, setPreference] = useState<ColorModePreference>(getStoredPreference);
    const mode = resolveColorMode(preference, usePrefersDark());

    useEffect(() => {
        applyColorMode(mode);
    }, [mode]);

    const setColorMode = (next: ColorModePreference) => {
        setStoredPreference(next);
        setPreference(next);
    };

    return { preference, setColorMode };
}
