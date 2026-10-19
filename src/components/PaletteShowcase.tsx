import { useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";
import { css } from "../../styled-system/css";
import { Symbol, type DisplayMode, type Palette } from "../utils/types";
import { PaletteGrainOverlay } from "./PaletteGrainOverlay";
import { PaletteSymbolArt } from "./PaletteSymbolArt";

const frameClass = css({
    width: "100%",
    aspectRatio: "4 / 3",
    borderRadius: "0.375rem",
    overflow: "hidden",
});

const contentHostClass = css({
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

const GEOMETRY_VIEW_W = 100;
const GEOMETRY_VIEW_H = 75;
const TRI_CX = 50;
const TRI_CY = GEOMETRY_VIEW_H / 4;
const SQUARE_X = 18;
const SQUARE_Y = 42;
const CIRCLE_CX = 72;
const CIRCLE_CY = 58;
const BASE_CIRCLE_R = 14;
const BASE_SQUARE = 22;
const BASE_TRI_H = 22;
const BASE_TRI_HALF_W = 12;

function jitterPx(epoch: number, id: string, slot: number): number {
    let n = epoch + slot * 997;
    for (let i = 0; i < id.length; i++) n = (n * 31 + id.charCodeAt(i)) | 0;
    return (Math.abs(n) % 21) - 10;
}

function trianglePoints(cx: number, cy: number, halfW: number, height: number): string {
    const apexY = cy - (2 * height) / 3;
    const baseY = cy + height / 3;
    return `${cx},${apexY} ${cx + halfW},${baseY} ${cx - halfW},${baseY}`;
}

type Props = {
    palette: Palette;
    mode: DisplayMode;
    grain: boolean;
    geometryEpoch: number;
};

export function PaletteShowcase({ palette, mode, grain, geometryEpoch }: Props) {
    const [c0, c1, c2, c3] = palette.colors;
    const frameRef = useRef<HTMLDivElement>(null);
    const [frameWidth, setFrameWidth] = useState(0);

    useLayoutEffect(() => {
        const el = frameRef.current;
        if (!el) return;
        const update = () => setFrameWidth(el.clientWidth);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const geometry = useMemo(() => {
        const toView = (px: number) => (px / Math.max(frameWidth, 240)) * GEOMETRY_VIEW_W;
        const triDelta = toView(jitterPx(geometryEpoch, palette.id, 0));
        const triH = BASE_TRI_H + triDelta;
        const triHalfW = BASE_TRI_HALF_W + triDelta * (BASE_TRI_HALF_W / BASE_TRI_H);
        return {
            circleR: BASE_CIRCLE_R + toView(jitterPx(geometryEpoch, palette.id, 1)),
            circleCy: CIRCLE_CY - toView(16),
            square: BASE_SQUARE + toView(jitterPx(geometryEpoch, palette.id, 2)),
            triPoints: trianglePoints(TRI_CX, TRI_CY, triHalfW, triH),
        };
    }, [frameWidth, geometryEpoch, palette.id]);

    const content =
        mode === "stripes" ? (
            <div class={stripesClass}>
                {palette.colors.map((color, i) => (
                    <div key={i} class={stripeClass} style={{ background: color }} />
                ))}
            </div>
        ) : mode === "geometry" ? (
            <svg
                viewBox={`0 0 ${GEOMETRY_VIEW_W} ${GEOMETRY_VIEW_H}`}
                width="100%"
                height="100%"
                aria-hidden="true"
            >
                <polygon points={geometry.triPoints} fill={c3} />
                <rect x={SQUARE_X} y={SQUARE_Y} width={geometry.square} height={geometry.square} fill={c2} />
                <circle cx={CIRCLE_CX} cy={geometry.circleCy} r={geometry.circleR} fill={c1} />
            </svg>
        ) : (
            <div class={symbolWrapClass}>
                <div class={symbolInnerClass}>
                    <PaletteSymbolArt symbol={palette.symbol ?? Symbol.Flower} fills={[c1, c2, c3]} />
                </div>
            </div>
        );

    const frameBg = mode !== "stripes" ? c0 : undefined;

    return (
        <div ref={frameRef} class={frameClass} style={frameBg ? { background: frameBg } : undefined}>
            <div class={contentHostClass}>
                {content}
                {grain && <PaletteGrainOverlay />}
            </div>
        </div>
    );
}
