package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	http.HandleFunc("/pokemon/", rootHandler)
	http.HandleFunc("/pokemon", getAllPokemonHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Path
	name := strings.TrimPrefix(url, "/pokemon/")
	path := fmt.Sprintf("../data/%s.json", name)
	content, err := os.ReadFile(path)

	if err != nil {
		log.Printf("Failed to read file: %v", err)
		http.Error(w, "Something went wrong.", http.StatusInternalServerError)
		return
	}

	var p Pokemon
	err = json.Unmarshal(content, &p)

	if err != nil {
		log.Printf("Failed to unmarshal JSON: %v", err)
		http.Error(w, "Something went wrong.", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(p)
}

func getAllPokemonHandler(w http.ResponseWriter, r *http.Request) {
	files, err := os.ReadDir("../data")

	if err != nil {
		log.Printf("Failed to read directory: %v", err)
		http.Error(w, "Something went wrong.", http.StatusInternalServerError)
		return
	}

	type PokemonListItem struct {
		Name string `json:"name"`
		URL  string `json:"url"`
	}

	pokemonList := []PokemonListItem{}

	for _, file := range files {
		if strings.HasPrefix(file.Name(), ".") {
			continue
		}

		file_name := file.Name()
		name := strings.TrimSuffix(file_name, ".json")

		item := PokemonListItem{
			Name: name,
			URL:  "/pokemon/" + name,
		}

		pokemonList = append(pokemonList, item)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pokemonList)
}
