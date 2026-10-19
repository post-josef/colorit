import type { Palette, Tag } from "./types";

function paletteSearchText(palette: Palette): string {
    const parts = [
        palette.id,
        ...palette.tags,
        ...palette.colors,
        ...(palette.font ?? []),
        palette.symbol ?? "",
    ];
    return parts.join(" ").toLowerCase();
}

export function filterPalettes(
    palettes: Palette[],
    query: string,
    selectedTags: Tag[],
): Palette[] {
    const q = query.trim().toLowerCase();

    return palettes.filter((palette) => {
        if (selectedTags.length > 0) {
            const hasAllTags = selectedTags.every((tag) => palette.tags.includes(tag));
            if (!hasAllTags) return false;
        }
        if (!q) return true;
        return paletteSearchText(palette).includes(q);
    });
}
