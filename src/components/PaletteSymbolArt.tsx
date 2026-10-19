import { Symbol } from "../types";

type Props = {
    symbol: Symbol;
    fills: [string, string, string];
};

export function PaletteSymbolArt({ symbol, fills }: Props) {
    const [a, b, c] = fills;

    switch (symbol) {
        case Symbol.Flower:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <circle cx="32" cy="20" r="9" fill={a} />
                    <circle cx="44" cy="28" r="9" fill={b} />
                    <circle cx="40" cy="42" r="9" fill={c} />
                    <circle cx="24" cy="42" r="9" fill={a} />
                    <circle cx="20" cy="28" r="9" fill={b} />
                    <circle cx="32" cy="32" r="7" fill={c} />
                </svg>
            );
        case Symbol.Fruit:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <ellipse cx="32" cy="38" rx="18" ry="20" fill={a} />
                    <path d="M32 18 C28 8 38 6 40 16 Z" fill={b} />
                    <path d="M40 16 C48 12 50 22 42 24 Z" fill={c} />
                </svg>
            );
        case Symbol.Drink:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <path d="M22 14 H42 L38 52 H26 Z" fill={a} />
                    <rect x="24" y="22" width="16" height="8" fill={b} />
                    <ellipse cx="32" cy="52" rx="8" ry="3" fill={c} />
                    <path d="M42 18 C50 18 52 26 44 28" stroke={c} strokeWidth="3" fill="none" />
                </svg>
            );
        case Symbol.Cube:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <path d="M32 12 L52 24 V44 L32 56 L12 44 V24 Z" fill={a} />
                    <path d="M32 12 L32 32 L12 24 V44 L32 56 V32 L52 44 V24 L32 32 Z" fill={b} />
                    <path d="M32 12 L52 24 L32 32 L12 24 Z" fill={c} />
                </svg>
            );
        case Symbol.Car:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <path d="M10 36 H54 L50 28 H40 L36 22 H28 L24 28 H14 Z" fill={a} />
                    <rect x="12" y="36" width="40" height="10" rx="2" fill={b} />
                    <circle cx="20" cy="48" r="6" fill={c} />
                    <circle cx="44" cy="48" r="6" fill={c} />
                </svg>
            );
        case Symbol.Phone:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <rect x="20" y="10" width="24" height="44" rx="4" fill={a} />
                    <rect x="24" y="16" width="16" height="28" rx="1" fill={b} />
                    <circle cx="32" cy="48" r="2.5" fill={c} />
                </svg>
            );
        case Symbol.Headphones:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <path
                        d="M16 36 C16 22 24 14 32 14 C40 14 48 22 48 36"
                        stroke={a}
                        strokeWidth="5"
                        fill="none"
                    />
                    <rect x="10" y="34" width="10" height="16" rx="3" fill={b} />
                    <rect x="44" y="34" width="10" height="16" rx="3" fill={c} />
                </svg>
            );
        case Symbol.Jacket:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <path d="M32 14 L22 22 V54 H42 V22 Z" fill={a} />
                    <path d="M32 14 L42 22 V54 H32 Z" fill={b} />
                    <path d="M32 14 L22 22 V54 H32 Z" fill={c} />
                    <path d="M28 22 H36 V54 H28 Z" fill={b} opacity="0.35" />
                </svg>
            );
        case Symbol.Shoe:
            return (
                <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
                    <path d="M10 38 H44 C52 38 56 42 54 46 H8 C8 42 8 38 10 38 Z" fill={a} />
                    <path d="M14 38 C18 30 28 26 38 28 L42 38 Z" fill={b} />
                    <rect x="38" y="30" width="6" height="8" rx="1" fill={c} />
                </svg>
            );
    }
}
