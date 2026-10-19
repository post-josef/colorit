export const Tag = {
    Spring: "spring",
    Summer: "summer",
    Autumn: "autumn",
    Winter: "winter",
    Pastel: "pastel",
    Neon: "neon",
    Corporate: "corporate",
    Poster: "poster",
} as const;

export type Tag = (typeof Tag)[keyof typeof Tag];

export const Symbol = {
    Flower: "flower",
    Fruit: "fruit",
    Drink: "drink",
    Cube: "cube",
    Car: "car",
    Phone: "phone",
    Headphones: "headphones",
    Jacket: "jacket",
    Shoe: "shoe",
} as const;

export type Symbol = (typeof Symbol)[keyof typeof Symbol];

export type Palette = {
    id: string;
    colors: string[];
    tags: Tag[];
    font?: string[];
    symbol?: Symbol;
};

export type DisplayMode = "stripes" | "geometry" | "symbols";

export type GridSize = "small" | "medium" | "big";
