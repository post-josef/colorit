import type { ComponentChildren } from "preact";
import { useEffect, useId, useState } from "preact/hooks";
import { css } from "../../styled-system/css";

const wrapClass = css({
    position: "relative",
    display: "inline-flex",
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
    transition: "opacity 120ms ease, transform 120ms ease",
};

const shellVisibleClass = css({
    ...shellBase,
    opacity: 1,
    transform: "translateX(-50%) translateY(0)",
});

const shellHiddenClass = css({
    ...shellBase,
    opacity: 0,
    transform: "translateX(-50%) translateY(-4px)",
});

const bodyClass = css({
    position: "relative",
    padding: "8px 12px",
    borderRadius: "md",
    fontSize: "xs",
    fontWeight: "medium",
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
};

export function Tooltip({ label, children }: Props) {
    const [open, setOpen] = useState(false);
    const [present, setPresent] = useState(false);
    const [visible, setVisible] = useState(false);
    const id = useId();

    useEffect(() => {
        if (open) {
            setPresent(true);
            const frame = requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
            return () => cancelAnimationFrame(frame);
        }
        setVisible(false);
    }, [open]);

    const handleTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName !== "opacity") return;
        if (!visible) setPresent(false);
    };

    const describedBy = open && present ? id : undefined;

    return (
        <span
            class={wrapClass}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocusIn={() => setOpen(true)}
            onFocusOut={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
            }}
        >
            <span aria-describedby={describedBy}>{children}</span>
            {present && (
                <span
                    id={id}
                    role="tooltip"
                    class={visible ? shellVisibleClass : shellHiddenClass}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <span class={bodyClass}>{label}</span>
                </span>
            )}
        </span>
    );
}
