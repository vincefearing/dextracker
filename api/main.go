package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", rootHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	content, err := os.ReadFile("../data/abra.json")

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
