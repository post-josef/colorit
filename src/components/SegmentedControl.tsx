import type { ComponentChildren } from "preact";
import type { LucideIcon } from "lucide-preact";
import { css, cx } from "../../styled-system/css";
import { Tooltip } from "./Tooltip";

export type SegmentOption<T extends string> = {
    value: T;
    label: string;
    icon: ComponentChildren;
};

export function segOption<T extends string>(value: T, label: string, Icon: LucideIcon): SegmentOption<T> {
    return { value, label, icon: <Icon size={18} strokeWidth={2} aria-hidden /> };
}

const groupBaseClass = css({
    display: "inline-flex",
    alignSelf: "flex-start",
    width: "fit-content",
    gap: "0.5",
    padding: "1",
});

const groupFramedClass = css({
    borderRadius: "lg",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border",
    borderTopColor: "borderTop",
    bg: "surface",
});

const groupInlineClass = css({
    borderWidth: "0",
    borderStyle: "none",
    borderColor: "transparent",
});

const buttonClass = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    width: "2.25rem",
    height: "2.25rem",
    padding: 0,
    borderRadius: "md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    bg: "transparent",
    color: "fg",
    cursor: "pointer",
    opacity: 0.56,
    transition: "opacity 150ms, background 150ms, border-color 150ms, box-shadow 150ms",
    _hover: { opacity: 0.85, bg: "controlActive" },
});

const buttonActiveClass = css({
    bg: "bg",
    opacity: 1,
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 0 rgba(255, 255, 255, 0.2)",
    _hover: { opacity: 1, bg: "bg" },
    _dark: {
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.64), 0 1px 0 rgba(255, 255, 255, 0.06)",
    },
});

const buttonActiveFramedClass = css({
    borderColor: "border",
});

type Props<T extends string> = {
    value: T;
    options: SegmentOption<T>[];
    onChange: (value: T) => void;
    "aria-label": string;
    variant?: "framed" | "inline";
};

export function SegmentedControl<T extends string>({
    value,
    options,
    onChange,
    "aria-label": ariaLabel,
    variant = "framed",
}: Props<T>) {
    return (
        <div
            class={cx(groupBaseClass, variant === "inline" ? groupInlineClass : groupFramedClass)}
            role="radiogroup"
            aria-label={ariaLabel}
        >
            {options.map((option) => (
                <Tooltip key={option.value} label={option.label}>
                    <button
                        type="button"
                        role="radio"
                        aria-label={option.label}
                        aria-checked={value === option.value}
                        class={cx(
                            buttonClass,
                            value === option.value && buttonActiveClass,
                            variant === "framed" && value === option.value && buttonActiveFramedClass,
                        )}
                        onClick={() => onChange(option.value)}
                    >
                        {option.icon}
                    </button>
                </Tooltip>
            ))}
        </div>
    );
}
