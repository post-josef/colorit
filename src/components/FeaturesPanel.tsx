import { CircleOff, Columns4, Grid3x3, Grip, LayoutGrid, Shapes, Sparkles, Square, X } from "lucide-preact";
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
    gap: "1",
});

const togglesGroupClass = css({
    display: "flex",
    flexDirection: { base: "row", md: "column" },
    gap: { base: "4", md: "6" },
    alignItems: { base: "flex-start", md: "stretch" },
});

const toggleSectionClass = css({
    display: "flex",
    flexDirection: "column",
    gap: "1",
    flex: { base: "1 1 0", md: "0 0 auto" },
    minWidth: { base: 0, md: "auto" },
});

const labelClass = css({
    fontSize: "sm",
    fontWeight: "semibold",
    opacity: 0.85,
});

const fieldClass = css({
    width: "100%",
    boxSizing: "border-box",
    height: "9",
    paddingTop: "1",
    paddingBottom: "1",
    paddingLeft: "2",
    paddingRight: "2",
    borderRadius: "md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border",
    bg: "surface",
    color: "fg",
    fontSize: "sm",
    lineHeight: "tight",
    _focus: { outline: "none" },
    _focusVisible: { outline: "none" },
});

const filterFieldClass = css({
    position: "relative",
    flex: 1,
    minWidth: 0,
});

const filterInputClass = css({
    paddingRight: "8",
    "&::-webkit-search-cancel-button": {
        display: "none",
    },
});

const dismissButtonClass = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1",
    margin: "0",
    borderRadius: "sm",
    border: "none",
    bg: "transparent",
    color: "fg",
    cursor: "pointer",
    opacity: 0.75,
    lineHeight: 1,
    _hover: { opacity: 1, bg: "controlActive" },
});

const filterClearButtonClass = css({
    position: "absolute",
    top: "50%",
    right: "1",
    transform: "translateY(-50%)",
});

const selectClass = css({
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
    paddingTop: "0.5",
    paddingBottom: "0.5",
    paddingRight: "0.5",
    paddingLeft: "2",
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

type GrainToggle = "off" | "on";

const grainOptions: SegmentOption<GrainToggle>[] = [
    {
        value: "off",
        tooltip: "No grain",
        label: "Grain off",
        icon: <CircleOff size={18} strokeWidth={2} aria-hidden />,
    },
    {
        value: "on",
        tooltip: "Grain",
        label: "Grain on",
        icon: <Grip size={18} strokeWidth={2} aria-hidden />,
    },
];

const sizeOptions: SegmentOption<GridSize>[] = [
    {
        value: "small",
        tooltip: "Small",
        label: "Small grid",
        icon: <Grid3x3 size={18} strokeWidth={2} aria-hidden />,
    },
    {
        value: "medium",
        tooltip: "Medium",
        label: "Medium grid",
        icon: <LayoutGrid size={18} strokeWidth={2} aria-hidden />,
    },
    {
        value: "big",
        tooltip: "Big",
        label: "Big grid",
        icon: <Square size={18} strokeWidth={2} aria-hidden />,
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
    grainEnabled: boolean;
    onGrainEnabledChange: (enabled: boolean) => void;
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
    grainEnabled,
    onGrainEnabledChange,
}: Props) {
    const availableTags = (Object.values(Tag) as Tag[]).filter((tag) => !selectedTags.includes(tag));

    return (
        <aside class={panelClass} aria-label="Palette options">
            <section class={sectionClass}>
                <label class={labelClass} for="palette-filter">
                    Filter
                </label>
                <div class={filterFieldClass}>
                    <input
                        id="palette-filter"
                        type="search"
                        class={`${fieldClass} ${filterInputClass}`}
                        placeholder="Search palettes…"
                        value={filterQuery}
                        onInput={(e) => onFilterQueryChange(e.currentTarget.value)}
                        aria-label="Filter palettes"
                    />
                    {filterQuery.length > 0 && (
                        <button
                            type="button"
                            class={`${dismissButtonClass} ${filterClearButtonClass}`}
                            aria-label="Clear filter"
                            onClick={() => onFilterQueryChange("")}
                        >
                            <X size={16} strokeWidth={2} aria-hidden />
                        </button>
                    )}
                </div>
            </section>

            <section class={sectionClass}>
                <span class={labelClass} id="tags-label">
                    Tags
                </span>
                {selectedTags.length > 0 && (
                    <div class={chipRowClass} role="list" aria-labelledby="tags-label">
                        {selectedTags.map((tag) => (
                            <span key={tag} class={chipClass} role="listitem">
                                {tag}
                                <button
                                    type="button"
                                    class={dismissButtonClass}
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
                    class={`${fieldClass} ${selectClass}`}
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
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </section>

            <div class={togglesGroupClass}>
                <section class={toggleSectionClass}>
                    <span class={labelClass}>Display</span>
                    <SegmentedControl
                        aria-label="Palette display mode"
                        value={displayMode}
                        options={displayOptions}
                        onChange={onDisplayModeChange}
                    />
                </section>

                <section class={toggleSectionClass}>
                    <span class={labelClass}>Size</span>
                    <SegmentedControl
                        aria-label="Grid size"
                        value={gridSize}
                        options={sizeOptions}
                        onChange={onGridSizeChange}
                    />
                </section>

                <section class={toggleSectionClass}>
                    <span class={labelClass}>Grain</span>
                    <SegmentedControl
                        aria-label="Grain effect"
                        value={grainEnabled ? "on" : "off"}
                        options={grainOptions}
                        onChange={(value) => onGrainEnabledChange(value === "on")}
                    />
                </section>
            </div>
        </aside>
    );
}
