import type { ComponentChildren } from "preact";
import { css, cx } from "../../styled-system/css";
import { Tooltip } from "./Tooltip";

export type SegmentOption<T extends string> = {
    value: T;
    label: string;
    tooltip: string;
    icon: ComponentChildren;
};

const groupClass = css({
    display: "flex",
    gap: "0.5",
    padding: "1",
    borderRadius: "lg",
    bg: "surface",
});

const buttonClass = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2",
    borderRadius: "md",
    border: "none",
    bg: "transparent",
    color: "fg",
    cursor: "pointer",
    opacity: 0.65,
    transition: "opacity 150ms, background 150ms",
    _hover: { opacity: 1 },
});

const buttonActiveClass = css({
    bg: "controlActive",
    opacity: 1,
});

type Props<T extends string> = {
    value: T;
    options: SegmentOption<T>[];
    onChange: (value: T) => void;
    "aria-label": string;
};

export function SegmentedControl<T extends string>({
    value,
    options,
    onChange,
    "aria-label": ariaLabel,
}: Props<T>) {
    return (
        <div class={groupClass} role="radiogroup" aria-label={ariaLabel}>
            {options.map((option) => (
                <Tooltip key={option.value} label={option.tooltip}>
                    <button
                        type="button"
                        role="radio"
                        aria-label={option.label}
                        aria-checked={value === option.value}
                        class={cx(buttonClass, value === option.value && buttonActiveClass)}
                        onClick={() => onChange(option.value)}
                    >
                        {option.icon}
                    </button>
                </Tooltip>
            ))}
        </div>
    );
}
