import { css } from "../../styled-system/css";
import { Symbol, type DisplayMode, type Palette } from "../types";
import { PaletteSymbolArt } from "./PaletteSymbolArt";

const frameClass = css({
    width: "100%",
    aspectRatio: "4 / 3",
    borderRadius: "0.375rem",
    overflow: "hidden",
});

const stripesClass = css({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    height: "100%",
});

const stripeClass = css({
    height: "100%",
});

const geometryClass = css({
    position: "relative",
    height: "100%",
    width: "100%",
});

const symbolClass = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: "4",
});

const symbolInnerClass = css({
    width: "70%",
    maxWidth: "8rem",
    aspectRatio: "1",
});

type Props = {
    palette: Palette;
    mode: DisplayMode;
};

export function PaletteShowcase({ palette, mode }: Props) {
    const [c0, c1, c2, c3] = palette.colors;

    if (mode === "stripes") {
        return (
            <div class={frameClass}>
                <div class={stripesClass}>
                    {palette.colors.map((color, index) => (
                        <div key={index} class={stripeClass} style={{ background: color }} />
                    ))}
                </div>
            </div>
        );
    }

    if (mode === "geometry") {
        return (
            <div class={frameClass} style={{ background: c0 }}>
                <div class={geometryClass}>
                    <svg viewBox="0 0 100 75" width="100%" height="100%" aria-hidden="true">
                        <circle cx="72" cy="22" r="14" fill={c1} />
                        <rect x="18" y="42" width="22" height="22" fill={c2} />
                        <polygon points="50,12 62,38 38,38" fill={c3} />
                    </svg>
                </div>
            </div>
        );
    }

    const symbol = palette.symbol ?? Symbol.Flower;
    const fills = [c1, c2, c3] as [string, string, string];

    return (
        <div class={frameClass} style={{ background: c0 }}>
            <div class={symbolClass}>
                <div class={symbolInnerClass}>
                    <PaletteSymbolArt symbol={symbol} fills={fills} />
                </div>
            </div>
        </div>
    );
}
