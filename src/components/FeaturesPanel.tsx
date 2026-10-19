import type { ComponentChildren } from "preact";
import { CircleOff, Columns4, Grid3x3, Grip, LayoutGrid, Shapes, Sparkles, Square, X } from "lucide-preact";
import { css, cx } from "../../styled-system/css";
import { Tag, type DisplayMode, type GridSize } from "../utils/types";
import { SegmentedControl, segOption, type SegmentOption } from "./SegmentedControl";

const panelClass = css({
    flexShrink: 0,
    width: { base: "100%", md: "15rem" },
    display: "flex",
    flexDirection: "column",
    gap: { base: "4", md: "6" },
    p: "5",
    pt: { base: "4", md: "5" },
    borderColor: "border",
    borderBottomWidth: { base: "1px", md: "0" },
    borderBottomStyle: { base: "solid", md: "none" },
    borderRightWidth: { base: "0", md: "1px" },
    borderRightStyle: { md: "solid" },
    bg: "bg",
    overflowY: "auto",
});

const sectionClass = css({ display: "flex", flexDirection: "column", gap: "1" });

const filterSectionClass = css({
    display: { base: "none", md: "flex" },
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

const labelClass = css({ fontSize: "sm", fontWeight: "semibold", opacity: 0.85 });

function ToggleSection({ label, children }: { label: string; children: ComponentChildren }) {
    return (
        <section class={toggleSectionClass}>
            <span class={labelClass}>{label}</span>
            {children}
        </section>
    );
}

const fieldClass = css({
    width: "100%",
    boxSizing: "border-box",
    height: "9",
    py: "1",
    px: "2",
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

const iconBtnClass = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    p: "1",
    m: "0",
    borderRadius: "sm",
    border: "none",
    bg: "transparent",
    color: "fg",
    cursor: "pointer",
    opacity: 0.75,
    lineHeight: 1,
    _hover: { opacity: 1, bg: "controlActive" },
});

const filterFieldClass = css({ position: "relative", flex: 1, minWidth: 0 });

const filterInputClass = css({
    paddingRight: "8",
    "&::-webkit-search-cancel-button": { display: "none" },
});

const filterClearClass = css({
    position: "absolute",
    top: "50%",
    right: "1",
    transform: "translateY(-50%)",
});

const chipRowClass = css({ display: "flex", flexWrap: "wrap", gap: "1.5" });

const chipClass = css({
    display: "inline-flex",
    alignItems: "center",
    gap: "1",
    py: "0.5",
    pl: "2",
    pr: "0.5",
    borderRadius: "md",
    fontSize: "xs",
    bg: "controlActive",
});

const displayOptions: SegmentOption<DisplayMode>[] = [
    segOption("stripes", "Stripes", Columns4),
    segOption("geometry", "Geometry", Shapes),
    segOption("symbols", "Symbols", Sparkles),
];

const grainOptions: SegmentOption<"off" | "on">[] = [
    segOption("off", "Grain Off", CircleOff),
    segOption("on", "Grain On", Grip),
];

const sizeOptions: SegmentOption<GridSize>[] = [
    segOption("small", "Small", Grid3x3),
    segOption("medium", "Medium", LayoutGrid),
    segOption("big", "Big", Square),
];

const ALL_TAGS = Object.values(Tag);

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
    const availableTags = ALL_TAGS.filter((tag) => !selectedTags.includes(tag));

    return (
        <aside class={panelClass} aria-label="Palette options">
            <section class={filterSectionClass}>
                <label class={labelClass} for="palette-filter">
                    Filter
                </label>
                <div class={filterFieldClass}>
                    <input
                        id="palette-filter"
                        type="search"
                        class={cx(fieldClass, filterInputClass)}
                        placeholder="Search palettes…"
                        value={filterQuery}
                        onInput={(e) => onFilterQueryChange(e.currentTarget.value)}
                        aria-label="Filter palettes"
                    />
                    {filterQuery && (
                        <button
                            type="button"
                            class={cx(iconBtnClass, filterClearClass)}
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
                                    class={iconBtnClass}
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
                    class={cx(fieldClass, css({ cursor: "pointer" }))}
                    value=""
                    aria-label="Add tag filter"
                    disabled={!availableTags.length}
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
                <ToggleSection label="Display">
                    <SegmentedControl
                        aria-label="Palette display mode"
                        value={displayMode}
                        options={displayOptions}
                        onChange={onDisplayModeChange}
                    />
                </ToggleSection>
                <ToggleSection label="Size">
                    <SegmentedControl
                        aria-label="Grid size"
                        value={gridSize}
                        options={sizeOptions}
                        onChange={onGridSizeChange}
                    />
                </ToggleSection>
                <ToggleSection label="Grain">
                    <SegmentedControl
                        aria-label="Grain effect"
                        value={grainEnabled ? "on" : "off"}
                        options={grainOptions}
                        onChange={(v) => onGrainEnabledChange(v === "on")}
                    />
                </ToggleSection>
            </div>
        </aside>
    );
}
