import { Columns4, Expand, LayoutGrid, Shapes, Sparkles, X } from "lucide-preact";
import { css } from "../../styled-system/css";
import { Tag, type DisplayMode, type GridSize } from "../types";
import { SegmentedControl, type SegmentOption } from "./SegmentedControl";

const panelClass = css({
    flexShrink: 0,
    width: { base: "100%", md: "15rem" },
    display: "flex",
    flexDirection: "column",
    gap: "6",
    padding: "5",
    borderRightWidth: { md: "1px" },
    borderRightStyle: "solid",
    borderColor: "border",
    bg: "bg",
    overflowY: "auto",
});

const sectionClass = css({
    display: "flex",
    flexDirection: "column",
    gap: "2",
});

const labelClass = css({
    fontSize: "sm",
    fontWeight: "semibold",
    opacity: 0.85,
});

const filterRowClass = css({
    display: "flex",
    alignItems: "center",
    gap: "1",
});

const inputClass = css({
    flex: 1,
    minWidth: 0,
    padding: "2 3",
    borderRadius: "md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border",
    bg: "surface",
    color: "fg",
    fontSize: "sm",
    _focusVisible: {
        outline: "2px solid",
        outlineColor: "fg",
        outlineOffset: "2px",
    },
});

const iconButtonClass = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2",
    borderRadius: "md",
    border: "none",
    bg: "transparent",
    color: "fg",
    cursor: "pointer",
    opacity: 0.75,
    _hover: { opacity: 1, bg: "controlActive" },
});

const selectClass = css({
    width: "100%",
    padding: "2 3",
    borderRadius: "md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border",
    bg: "surface",
    color: "fg",
    fontSize: "sm",
    cursor: "pointer",
});

const chipRowClass = css({
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5",
});

const chipClass = css({
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
    padding: "1 2",
    borderRadius: "md",
    fontSize: "xs",
    bg: "controlActive",
});

const displayOptions: SegmentOption<DisplayMode>[] = [
    {
        value: "stripes",
        tooltip: "Stripes",
        label: "Stripes display",
        icon: <Columns4 size={18} strokeWidth={2} aria-hidden />,
    },
    {
        value: "geometry",
        tooltip: "Geometry",
        label: "Geometry display",
        icon: <Shapes size={18} strokeWidth={2} aria-hidden />,
    },
    {
        value: "symbols",
        tooltip: "Symbols",
        label: "Symbols display",
        icon: <Sparkles size={18} strokeWidth={2} aria-hidden />,
    },
];

const sizeOptions: SegmentOption<GridSize>[] = [
    {
        value: "small",
        tooltip: "Small",
        label: "Small grid",
        icon: <LayoutGrid size={16} strokeWidth={2} aria-hidden />,
    },
    {
        value: "medium",
        tooltip: "Medium",
        label: "Medium grid",
        icon: <LayoutGrid size={20} strokeWidth={2} aria-hidden />,
    },
    {
        value: "big",
        tooltip: "Big",
        label: "Big grid",
        icon: <Expand size={18} strokeWidth={2} aria-hidden />,
    },
];

type Props = {
    filterQuery: string;
    onFilterQueryChange: (value: string) => void;
    selectedTags: Tag[];
    onAddTag: (tag: Tag) => void;
    onRemoveTag: (tag: Tag) => void;
    displayMode: DisplayMode;
    onDisplayModeChange: (mode: DisplayMode) => void;
    gridSize: GridSize;
    onGridSizeChange: (size: GridSize) => void;
};

export function FeaturesPanel({
    filterQuery,
    onFilterQueryChange,
    selectedTags,
    onAddTag,
    onRemoveTag,
    displayMode,
    onDisplayModeChange,
    gridSize,
    onGridSizeChange,
}: Props) {
    const availableTags = (Object.values(Tag) as Tag[]).filter((tag) => !selectedTags.includes(tag));

    return (
        <aside class={panelClass} aria-label="Palette options">
            <section class={sectionClass}>
                <label class={labelClass} for="palette-filter">Filter</label>
                <div class={filterRowClass}>
                    <input
                        id="palette-filter"
                        type="search"
                        class={inputClass}
                        placeholder="Search palettes…"
                        value={filterQuery}
                        onInput={(e) => onFilterQueryChange(e.currentTarget.value)}
                        aria-label="Filter palettes"
                    />
                    {filterQuery.length > 0 && (
                        <button
                            type="button"
                            class={iconButtonClass}
                            aria-label="Clear filter"
                            onClick={() => onFilterQueryChange("")}
                        >
                            <X size={18} strokeWidth={2} aria-hidden />
                        </button>
                    )}
                </div>
            </section>

            <section class={sectionClass}>
                <span class={labelClass} id="tags-label">Tags</span>
                {selectedTags.length > 0 && (
                    <div class={chipRowClass} role="list" aria-labelledby="tags-label">
                        {selectedTags.map((tag) => (
                            <span key={tag} class={chipClass} role="listitem">
                                {tag}
                                <button
                                    type="button"
                                    class={iconButtonClass}
                                    aria-label={`Remove tag ${tag}`}
                                    onClick={() => onRemoveTag(tag)}
                                >
                                    <X size={14} strokeWidth={2} aria-hidden />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                <select
                    class={selectClass}
                    value=""
                    aria-label="Add tag filter"
                    disabled={availableTags.length === 0}
                    onChange={(e) => {
                        const value = e.currentTarget.value as Tag;
                        if (value) onAddTag(value);
                        e.currentTarget.value = "";
                    }}
                >
                    <option value="">Add tag…</option>
                    {availableTags.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </section>

            <section class={sectionClass}>
                <span class={labelClass}>Display</span>
                <SegmentedControl
                    aria-label="Palette display mode"
                    value={displayMode}
                    options={displayOptions}
                    onChange={onDisplayModeChange}
                />
            </section>

            <section class={sectionClass}>
                <span class={labelClass}>Size</span>
                <SegmentedControl
                    aria-label="Grid size"
                    value={gridSize}
                    options={sizeOptions}
                    onChange={onGridSizeChange}
                />
            </section>
        </aside>
    );
}
