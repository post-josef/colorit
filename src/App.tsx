import { useMemo, useState } from "preact/hooks";
import { css } from "../styled-system/css";
import { FeaturesPanel } from "./components/FeaturesPanel";
import { PaletteCard } from "./components/PaletteCard";
import { TopBar } from "./components/TopBar";
import { filterPalettes } from "./utils/filterPalettes";
import type { DisplayMode, GridSize, Palette, Tag } from "./utils/types";
import palettesData from "./palettes.json";

const palettes = palettesData as Palette[];

const shellClass = css({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
});

const bodyClass = css({
    display: "flex",
    flex: 1,
    flexDirection: { base: "column", md: "row" },
    minHeight: 0,
});

const contentClass = css({
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    overflowY: "auto",
    padding: "5",
});

const gridBase = { display: "grid", gap: "4", alignContent: "start" as const };

const gridClass: Record<GridSize, string> = {
    small: css({ ...gridBase, gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))" }),
    medium: css({ ...gridBase, gridTemplateColumns: "repeat(auto-fill, minmax(19.5rem, 1fr))" }),
    big: css({ ...gridBase, gridTemplateColumns: "repeat(auto-fill, minmax(32rem, 1fr))" }),
};

const emptyClass = css({
    margin: 0,
    padding: "8",
    textAlign: "center",
    opacity: 0.7,
    letterSpacing: "0.6px",
});

export function App() {
    const [filterQuery, setFilterQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [displayMode, setDisplayMode] = useState<DisplayMode>("stripes");
    const [gridSize, setGridSize] = useState<GridSize>("medium");
    const [grainEnabled, setGrainEnabled] = useState(true);

    const filtered = useMemo(
        () => filterPalettes(palettes, filterQuery, selectedTags),
        [filterQuery, selectedTags],
    );

    return (
        <div class={shellClass}>
            <TopBar />
            <div class={bodyClass}>
                <FeaturesPanel
                    filterQuery={filterQuery}
                    onFilterQueryChange={setFilterQuery}
                    selectedTags={selectedTags}
                    onAddTag={(tag) => setSelectedTags((t) => (t.includes(tag) ? t : [...t, tag]))}
                    onRemoveTag={(tag) => setSelectedTags((t) => t.filter((x) => x !== tag))}
                    displayMode={displayMode}
                    onDisplayModeChange={setDisplayMode}
                    gridSize={gridSize}
                    onGridSizeChange={setGridSize}
                    grainEnabled={grainEnabled}
                    onGrainEnabledChange={setGrainEnabled}
                />
                <main class={contentClass} aria-label="Palettes">
                    {filtered.length === 0 ? (
                        <p class={emptyClass}>No palettes match your filters.</p>
                    ) : (
                        <div class={gridClass[gridSize]}>
                            {filtered.map((palette) => (
                                <PaletteCard
                                    key={palette.id}
                                    palette={palette}
                                    displayMode={displayMode}
                                    grain={grainEnabled}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
