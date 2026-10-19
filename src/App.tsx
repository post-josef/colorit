import { ColorSwatch } from "./components/ColorSwatch";

const palette = [
    { name: "Coral", hex: "#ff6b6b" },
    { name: "Sun", hex: "#ffd93d" },
    { name: "Mint", hex: "#6bcb77" },
    { name: "Sky", hex: "#4d96ff" },
    { name: "Lilac", hex: "#b388ff" },
];

export function App() {
    return (
        <main class="page">
            <h1>Colorit</h1>
            <p class="tagline">A tiny splash of color.</p>
            <div class="swatches">
                {palette.map((color) => (
                    <ColorSwatch key={color.hex} {...color} />
                ))}
            </div>
        </main>
    );
}
