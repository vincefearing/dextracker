package main

type SpriteDetails struct {
	Normal string `json:"normal"`
	Shiny  string `json:"shiny"`
}

type Pokemon struct {
	Name           string                   `json:"name"`
	DexNumber      string                   `json:"dex_number"`
	Generation     int                      `json:"generation"`
	PokemonTypes   []string                 `json:"pokemon_types"`
	PokemonSprites map[string]SpriteDetails `json:"pokemon_sprites"`
	LocationData   map[string][]string      `json:"location_data"`
}
