type Props = {
    name: string;
    hex: string;
};

export function ColorSwatch({ name, hex }: Props) {
    return (
        <article class="swatch" style={{ "--swatch": hex }}>
            <div class="swatch__chip" />
            <span class="swatch__name">{name}</span>
            <code class="swatch__hex">{hex}</code>
        </article>
    );
}
