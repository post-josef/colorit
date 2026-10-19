import { useState } from "preact/hooks";
import { css } from "../../styled-system/css";
import type { DisplayMode, Palette } from "../types";
import { PaletteShowcase } from "./PaletteShowcase";
import { Tooltip } from "./Tooltip";

const cardClass = css({
    display: "flex",
    flexDirection: "column",
    gap: "3",
    padding: "3",
    borderRadius: "0.5625rem",
    bg: "surface",
});

const hexListClass = css({
    display: "flex",
    flexDirection: "column",
    gap: "0",
    margin: "0 -3",
    padding: 0,
    listStyle: "none",
});

const hexRowClass = css({
    width: "100%",
});

const hexButtonClass = css({
    display: "flex",
    alignItems: "center",
    gap: "2",
    width: "100%",
    padding: "4px 8px",
    borderRadius: "0.28125rem",
    border: "none",
    bg: "transparent",
    color: "fg",
    fontSize: "sm",
    fontFamily: "ui-monospace, monospace",
    cursor: "pointer",
    textAlign: "left",
    _hover: { bg: "controlActive" },
});

const hexTooltipWrapClass = css({
    display: "flex",
    width: "100%",
});

const swatchDotClass = css({
    width: "0.875rem",
    height: "0.875rem",
    borderRadius: "0.1875rem",
    flexShrink: 0,
});

type Props = {
    palette: Palette;
    displayMode: DisplayMode;
    grain: boolean;
};

export function PaletteCard({ palette, displayMode, grain }: Props) {
    const [copiedHex, setCopiedHex] = useState<string | null>(null);

    const copyHex = async (hex: string) => {
        try {
            await navigator.clipboard.writeText(hex);
            setCopiedHex(hex);
            window.setTimeout(() => setCopiedHex((current) => (current === hex ? null : current)), 1200);
        } catch {
            /* clipboard unavailable */
        }
    };

    return (
        <article class={cardClass} aria-label={`Palette ${palette.id}`}>
            <PaletteShowcase palette={palette} mode={displayMode} grain={grain} />
            <ul class={hexListClass}>
                {palette.colors.map((hex, index) => (
                    <li key={index} class={hexRowClass}>
                        <Tooltip label="Copied" class={hexTooltipWrapClass} open={copiedHex === hex}>
                            <button
                                type="button"
                                class={hexButtonClass}
                                onClick={() => copyHex(hex)}
                                aria-label={`Copy ${hex}`}
                            >
                                <span class={swatchDotClass} style={{ background: hex }} aria-hidden="true" />
                                {hex}
                            </button>
                        </Tooltip>
                    </li>
                ))}
            </ul>
        </article>
    );
}
