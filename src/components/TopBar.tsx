import { css } from "../../styled-system/css";
import { ThemeSelect } from "./ThemeSelect";

const barClass = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "4",
    flexShrink: 0,
    padding: "4 5",
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
    fontSize: { base: "xl", md: "2xl" },
    fontWeight: "normal",
    letterSpacing: "0.02em",
});

export function TopBar() {
    return (
        <header class={barClass}>
            <h1 class={titleClass}>Colorit Palettes</h1>
            <ThemeSelect />
        </header>
    );
}
