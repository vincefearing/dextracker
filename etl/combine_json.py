import os
import json


def combine_json_files():
    data_dir = "data"
    all_pokemon_data = []
    output_filename = "combined_pokedex.json"

    print(f"Reading files from '{data_dir}' directory...")

    # Loop through all files in the data directory
    for filename in sorted(os.listdir(data_dir)):
        if filename.endswith(".json"):
            file_path = os.path.join(data_dir, filename)

            with open(file_path, "r") as f:
                # Load the data from one pokemon file
                pokemon_data = json.load(f)
                # Add it to our master list
                all_pokemon_data.append(pokemon_data)

    # Write the entire list to a new file
    with open(output_filename, "w") as f:
        json.dump(all_pokemon_data, f, indent=4)

    print(
        f"\nSuccessfully combined {len(all_pokemon_data)} files into '{output_filename}'."
    )


if __name__ == "__main__":
    combine_json_files()
