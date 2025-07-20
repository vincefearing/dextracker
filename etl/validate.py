import os
import json


def validate_data():
    data_dir = "data"
    error_count = 0
    file_count = 0

    # The set of keys that every Pokemon JSON file should have.
    required_keys = {
        "name",
        "dex_number",
        "pokemon_types",
        "pokemon_sprites",
        "generation",
        "location_data",
    }

    print("Starting validation...")

    # Loop through all files in the data directory
    for filename in os.listdir(data_dir):
        if filename.endswith(".json"):
            file_count += 1
            file_path = os.path.join(data_dir, filename)

            try:
                with open(file_path, "r") as f:
                    data = json.load(f)

                # Check 1: All required keys are present
                if not required_keys.issubset(data.keys()):
                    print(f"ERROR: {filename} is missing one or more required keys.")
                    error_count += 1
                    continue  # Skip to the next file

                # Check 2: Essential data is not null or empty
                if not data["name"] or not data["dex_number"]:
                    print(f"ERROR: {filename} has a null name or dex_number.")
                    error_count += 1

                # Check 3: Data types are correct
                if not isinstance(data["pokemon_types"], list):
                    print(f"ERROR: {filename} 'pokemon_types' is not a list.")
                    error_count += 1

                if not isinstance(data["pokemon_sprites"], dict):
                    print(f"ERROR: {filename} 'pokemon_sprites' is not a dictionary.")
                    error_count += 1

            except json.JSONDecodeError:
                print(f"ERROR: {filename} is not a valid JSON file.")
                error_count += 1
            except Exception as e:
                print(f"An unexpected error occurred with {filename}: {e}")
                error_count += 1

    print("\n--- Validation Complete ---")
    print(f"Checked {file_count} files.")
    print(f"Found {error_count} errors.")


if __name__ == "__main__":
    validate_data()
