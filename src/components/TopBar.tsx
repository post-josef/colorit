import { css } from "../../styled-system/css";
import { ThemeSelect } from "./ThemeSelect";

const barClass = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4",
    flexShrink: 0,
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: "8px",
    paddingRight: "12px",
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
    _dark: {
        textShadow: "0 0 rgba(255, 255, 255, 0.4)",
    },
});

export function TopBar() {
    return (
        <header class={barClass}>
            <h1 class={titleClass} style={{ backgroundImage: "url(/colorit.png)" }}>
                Colorit Palettes
            </h1>
            <ThemeSelect />
        </header>
    );
}
