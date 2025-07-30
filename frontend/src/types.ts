type SpriteSet = {
    normal: string;
    shiny: string;
}

export type Pokemon = {
    name: string;
    url: string;
    dex_number: string;
    pokemon_sprites: {
        [key: string]: SpriteSet;
    };
};