import { useState } from "preact/hooks";
import { css } from "../../styled-system/css";
import type { DisplayMode, Palette } from "../types";
import { PaletteShowcase } from "./PaletteShowcase";

const cardClass = css({
    display: "flex",
    flexDirection: "column",
    gap: "3",
    padding: "3",
    borderRadius: "xl",
    bg: "surface",
});

const hexListClass = css({
    display: "flex",
    flexDirection: "column",
    gap: "1",
    margin: 0,
    padding: 0,
    listStyle: "none",
});

const hexButtonClass = css({
    display: "flex",
    alignItems: "center",
    gap: "2",
    width: "100%",
    padding: "1.5 2",
    borderRadius: "md",
    border: "none",
    bg: "transparent",
    color: "fg",
    fontSize: "sm",
    fontFamily: "ui-monospace, monospace",
    cursor: "pointer",
    textAlign: "left",
    _hover: { bg: "controlActive" },
});

const swatchDotClass = css({
    width: "0.875rem",
    height: "0.875rem",
    borderRadius: "sm",
    flexShrink: 0,
});

const copiedClass = css({
    fontSize: "xs",
    opacity: 0.7,
    textAlign: "center",
});

type Props = {
    palette: Palette;
    displayMode: DisplayMode;
};

export function PaletteCard({ palette, displayMode }: Props) {
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
            <PaletteShowcase palette={palette} mode={displayMode} />
            <ul class={hexListClass}>
                {palette.colors.map((hex, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            class={hexButtonClass}
                            onClick={() => copyHex(hex)}
                            aria-label={`Copy ${hex}`}
                        >
                            <span class={swatchDotClass} style={{ background: hex }} aria-hidden="true" />
                            {hex}
                        </button>
                    </li>
                ))}
            </ul>
            {copiedHex && (
                <p class={copiedClass} role="status" aria-live="polite">
                    Copied {copiedHex}
                </p>
            )}
        </article>
    );
}
