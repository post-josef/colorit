import { defineConfig } from "@pandacss/dev";

export default defineConfig({
    presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
    preflight: true,
    include: ["./src/**/*.{ts,tsx}"],
    outdir: "styled-system",
    jsxFramework: "preact",
    forceImportExtension: true,
    globalCss: {
        html: {
            height: "100%",
        },
        body: {
            margin: 0,
            height: "100%",
            fontFamily: "system-ui, sans-serif",
            bg: "bg",
            color: "fg",
        },
        "#app": {
            height: "100%",
        },
    },
    theme: {
        extend: {
            tokens: {
                fonts: {
                    display: { value: "'Gloria Hallelujah', cursive" },
                },
            },
            semanticTokens: {
                colors: {
                    border: {
                        value: {
                            base: "rgba(0, 0, 0, 0.1)",
                            _dark: "rgba(255, 255, 255, 0.12)",
                        },
                    },
                    borderTop: {
                        value: {
                            base: "rgba(0, 0, 0, 0.08)",
                            _dark: "rgba(255, 255, 255, 0.16)",
                        },
                    },
                    cardBorder: {
                        value: {
                            base: "#e1e1e1",
                            _dark: "#2e2e2e",
                        },
                    },
                    bg: {
                        value: { base: "#f8f9fc", _dark: "#17171c" },
                    },
                    fg: {
                        value: { base: "#1a1a2e", _dark: "#f5f5f5" },
                    },
                    surface: {
                        value: {
                            base: "rgba(0, 0, 0, 0.06)",
                            _dark: "rgba(255, 255, 255, 0.06)",
                        },
                    },
                    controlActive: {
                        value: {
                            base: "rgba(0, 0, 0, 0.1)",
                            _dark: "rgba(255, 255, 255, 0.12)",
                        },
                    },
                },
            },
        },
    },
});
