import { css } from "../../styled-system/css";
import { Symbol, type DisplayMode, type Palette } from "../utils/types";
import { PaletteSymbolArt } from "./PaletteSymbolArt";
import "./showcase-grain.css";

const frameClass = css({
    width: "100%",
    aspectRatio: "4 / 3",
    borderRadius: "0.375rem",
    overflow: "hidden",
});

const stripesHostClass = css({
    position: "relative",
    height: "100%",
    isolation: "isolate",
});

const stripesClass = css({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    height: "100%",
});

const stripeClass = css({ height: "100%" });

const symbolWrapClass = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
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
    grain: boolean;
};

export function PaletteShowcase({ palette, mode, grain }: Props) {
    const [c0, c1, c2, c3] = palette.colors;

    if (mode === "stripes") {
        return (
            <div class={frameClass}>
                <div class={stripesHostClass}>
                    <div class={stripesClass}>
                        {palette.colors.map((color, i) => (
                            <div key={i} class={stripeClass} style={{ background: color }} />
                        ))}
                    </div>
                    {grain && <div class="palette-showcase-grain" aria-hidden="true" />}
                </div>
            </div>
        );
    }

    if (mode === "geometry") {
        return (
            <div class={frameClass} style={{ background: c0 }}>
                <svg viewBox="0 0 100 75" width="100%" height="100%" aria-hidden="true">
                    <circle cx="72" cy="22" r="14" fill={c1} />
                    <rect x="18" y="42" width="22" height="22" fill={c2} />
                    <polygon points="50,12 62,38 38,38" fill={c3} />
                </svg>
            </div>
        );
    }

    return (
        <div class={frameClass} style={{ background: c0 }}>
            <div class={symbolWrapClass}>
                <div class={symbolInnerClass}>
                    <PaletteSymbolArt
                        symbol={palette.symbol ?? Symbol.Flower}
                        fills={[c1, c2, c3]}
                    />
                </div>
            </div>
        </div>
    );
}
