export enum Tag {
    Spring = "spring",
    Summer = "summer",
    Autumn = "autumn",
    Winter = "winter",
    Pastel = "pastel",
    Neon = "neon",
    Corporate = "corporate",
    Poster = "poster",
}

export enum Symbol {
    Flower = "flower",
    Fruit = "fruit",
    Drink = "drink",
    Cube = "cube",
    Car = "car",
    Phone = "phone",
    Headphones = "headphones",
    Jacket = "jacket",
    Shoe = "shoe",
}

export type Palette = {
    id: string;
    colors: string[];
    tags: Tag[];
    font?: string[];
    symbol?: Symbol;
};

export type DisplayMode = "stripes" | "geometry" | "symbols";

export type GridSize = "small" | "medium" | "big";
