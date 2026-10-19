import type { Palette, Tag } from "./types";

export function filterPalettes(palettes: Palette[], query: string, selectedTags: Tag[]): Palette[] {
    const q = query.trim().toLowerCase();
    return palettes.filter((p) => {
        if (selectedTags.length && !selectedTags.every((tag) => p.tags.includes(tag))) return false;
        if (!q) return true;
        return [p.id, ...p.tags, ...p.colors, ...(p.font ?? []), p.symbol ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(q);
    });
}
