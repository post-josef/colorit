export type ColorModePreference = "system" | "light" | "dark";
export type ResolvedColorMode = "light" | "dark";

const STORAGE_KEY = "colorit-color-mode";

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

export function resolveColorMode(preference: ColorModePreference): ResolvedColorMode {
    if (preference === "light" || preference === "dark") return preference;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Apply resolved mode: Panda `_dark` semantic tokens use `.dark` on the document root. */
export function applyColorMode(mode: ResolvedColorMode): void {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
}

export function bootstrapColorMode(): void {
    applyColorMode(resolveColorMode(getStoredPreference()));
}

