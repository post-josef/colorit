import { Monitor, Moon, Sun } from "lucide-preact";
import { css } from "../../styled-system/css";
import { type ColorModePreference, useColorMode } from "../utils/colorMode";
import { SegmentedControl, segOption, type SegmentOption } from "./SegmentedControl";

const barClass = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4",
    flexShrink: 0,
    py: "2px",
    pl: "8px",
    pr: "12px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderColor: "border",
    bg: "bg",
    zIndex: 2,
});

const titleClass = css({
    margin: 0,
    paddingInline: "4",
    fontFamily: "display",
    fontSize: "xl",
    fontWeight: "700",
    letterSpacing: "0.02em",
    backgroundRepeat: "repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 rgba(0, 0, 0, 0.2)",
    _dark: { textShadow: "0 0 rgba(255, 255, 255, 0.4)" },
});

const themeOptions: SegmentOption<ColorModePreference>[] = [
    segOption("dark", "Dark", Moon),
    segOption("light", "Light", Sun),
    segOption("system", "System", Monitor),
];

export function TopBar() {
    const { preference, setColorMode } = useColorMode();

    return (
        <header class={barClass}>
            <h1 class={titleClass} style={{ backgroundImage: "url(/colorit.png)" }}>
                Colorit Palettes
            </h1>
            <SegmentedControl
                variant="inline"
                aria-label="Color theme"
                value={preference}
                options={themeOptions}
                onChange={setColorMode}
            />
        </header>
    );
}
