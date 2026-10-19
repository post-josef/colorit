import type { ComponentChildren } from "preact";
import { useId, useState } from "preact/hooks";
import { css, cx } from "../../styled-system/css";

const wrapClass = css({
    position: "relative",
    display: "inline-flex",
});

const targetWrapClass = css({
    display: "flex",
    width: "100%",
    minWidth: 0,
});

const shellBase = {
    position: "absolute",
    top: "calc(100% + 3px)",
    left: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 10,
    transition: "opacity 120ms ease, transform 120ms ease, visibility 120ms ease",
};

const shellVisibleClass = css({
    ...shellBase,
    visibility: "visible",
    opacity: 1,
    transform: "translateX(-50%) translateY(0)",
});

const shellHiddenClass = css({
    ...shellBase,
    visibility: "hidden",
    opacity: 0,
    transform: "translateX(-50%) translateY(-4px)",
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
        borderLeftWidth: "5px",
        borderRightWidth: "5px",
        borderBottomWidth: "5px",
        borderLeftStyle: "solid",
        borderRightStyle: "solid",
        borderBottomStyle: "solid",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "rgba(255, 255, 255, 0.88)",
    },
    _dark: {
        bg: "rgba(37, 37, 42, 0.92)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
        _before: {
            borderBottomColor: "rgba(37, 37, 42, 0.92)",
        },
    },
});

type Props = {
    label: string;
    children: ComponentChildren;
    class?: string;
    /** When set, visibility is controlled externally (no hover/focus tooltip). */
    open?: boolean;
};

export function Tooltip({ label, children, class: className, open: openProp }: Props) {
    const [hoverOpen, setHoverOpen] = useState(false);
    const controlled = openProp !== undefined;
    const open = controlled ? openProp : hoverOpen;
    const id = useId();

    return (
        <span
            class={cx(wrapClass, className)}
            onMouseEnter={controlled ? undefined : () => setHoverOpen(true)}
            onMouseLeave={controlled ? undefined : () => setHoverOpen(false)}
            onFocusIn={controlled ? undefined : () => setHoverOpen(true)}
            onFocusOut={
                controlled
                    ? undefined
                    : (e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) setHoverOpen(false);
                      }
            }
        >
            <span class={targetWrapClass} aria-describedby={open ? id : undefined}>{children}</span>
            <span
                id={id}
                role="tooltip"
                aria-hidden={!open}
                class={open ? shellVisibleClass : shellHiddenClass}
            >
                <span class={bodyClass}>{label}</span>
            </span>
        </span>
    );
}
