import type { DisplayMode } from "../utils/types";
import "./showcase-grain.css";

export function PaletteGrainOverlay(props: { mode: DisplayMode }) {
    const className = `palette-showcase-grain palette-showcase-grain--${props.mode}`;
    return <div class={className} aria-hidden="true" />;
}
