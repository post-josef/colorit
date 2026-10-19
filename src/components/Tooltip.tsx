import type { ComponentChildren } from "preact";
import { useId, useState } from "preact/hooks";
import { css, cx } from "../../styled-system/css";

const wrapClass = css({ position: "relative", display: "inline-flex" });
const fullWidthClass = css({ display: "flex", width: "100%" });

const shellClass = css({
    position: "absolute",
    top: "calc(100% + 3px)",
    left: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 10,
    visibility: "hidden",
    opacity: 0,
    transform: "translateX(-50%) translateY(-4px)",
    transition: "opacity 120ms ease, transform 120ms ease, visibility 120ms ease",
    '&[data-open="true"]': {
        visibility: "visible",
        opacity: 1,
        transform: "translateX(-50%) translateY(0)",
    },
});

const bodyClass = css({
    position: "relative",
    padding: "8px 12px",
    borderRadius: "md",
    fontSize: "xs",
    fontWeight: "medium",
    letterSpacing: "0.1px",
    whiteSpace: "nowrap",
    color: "fg",
    bg: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)",
    _before: {
        content: '""',
        position: "absolute",
        bottom: "100%",
        left: "50%",
        marginBottom: "-1px",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderBottom: "5px solid rgba(255, 255, 255, 0.88)",
    },
    _dark: {
        bg: "rgba(37, 37, 42, 0.92)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
        _before: { borderBottomColor: "rgba(37, 37, 42, 0.92)" },
    },
});

type Props = {
    label: string;
    children: ComponentChildren;
    fullWidth?: boolean;
    open?: boolean;
};

export function Tooltip({ label, children, fullWidth, open: openProp }: Props) {
    const [hoverOpen, setHoverOpen] = useState(false);
    const open = openProp ?? hoverOpen;
    const id = useId();

    const setOpen = (next: boolean) => {
        if (openProp === undefined) setHoverOpen(next);
    };

    return (
        <span
            class={cx(wrapClass, fullWidth && fullWidthClass)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocusIn={() => setOpen(true)}
            onFocusOut={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
            }}
        >
            <span aria-describedby={open ? id : undefined}>{children}</span>
            <span id={id} role="tooltip" aria-hidden={!open} class={shellClass} data-open={open}>
                <span class={bodyClass}>{label}</span>
            </span>
        </span>
    );
}
