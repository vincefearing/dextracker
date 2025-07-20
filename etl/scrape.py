import requests
import json
import os
import time
from bs4 import BeautifulSoup
from constants import GENERATION_BOUNDARIES
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def fetch_html(url):
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        logger.info(f"Request was successful. Status: {r.status_code}")
        return r.text
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch {url}. Reason: {e}")
        return None


def parse_pokemon_data(html, name):
    if not html:
        return None

    soup = BeautifulSoup(html, "html.parser")

    dex_number = get_dex_number(soup)
    pokemon_types = get_typing(soup)
    pokemon_sprites = get_sprites(soup, name)
    location_data = get_location_info(soup)
    generation = get_generation(dex_number)

    pokemon_data = {
        "name": name,
        "dex_number": dex_number,
        "pokemon_types": pokemon_types,
        "pokemon_sprites": pokemon_sprites,
        "generation": generation,
        "location_data": location_data,
    }

    return pokemon_data


def get_dex_number(soup):
    number_header = soup.find("th", string="National №")
    dex_number = None

    if number_header:
        number_cell = number_header.find_next_sibling("td")
        if number_cell:
            dex_number = number_cell.get_text(strip=True)
    return dex_number


def get_typing(soup):
    type_header = soup.find("th", string="Type")
    pokemon_types = []

    if type_header:
        type_cell = type_header.find_next_sibling("td")
        if type_cell:
            type_links = type_cell.find_all("a")
            pokemon_types = [link.get_text(strip=True) for link in type_links]

    return pokemon_types


def get_sprites(soup, name):
    sprite_page_link = soup.find(
        "a", string=lambda t: t and "See all" in t and "sprites" in t
    )
    if not sprite_page_link:
        logger.error("Could not find the link to the sprites page.")
        return []

    partial_url = sprite_page_link["href"]
    full_url = f"https://pokemondb.net{partial_url}"

    sprite_page_html = fetch_html(full_url)
    if not sprite_page_html:
        logger.error(f"Could not fetch the sprite page HTML from {full_url}")
        return []

    sprite_soup = BeautifulSoup(sprite_page_html, "html.parser")

    simple_name = name.replace("♀", "").replace("♂", "")
    base_name = (
        simple_name.lower()
        .replace("'", "")
        .replace(".", "")
        .replace(":", "")
        .replace(" ", "-")
    )

    sprites_data = {}
    home_label_cell = sprite_soup.find(
        "td", string=lambda text: text and "Home" in text
    )

    if home_label_cell:
        sibling_cells = home_label_cell.find_next_siblings("td")

        for cell in sibling_cells:
            image_tags = cell.select("a > img")
            if image_tags:
                for tag in image_tags:
                    src = tag["src"]

                    high_res_url = src.replace("/1x/", "/")

                    form, sprite_type = parse_sprite_info(high_res_url, base_name)

                    if form not in sprites_data:
                        sprites_data[form] = {}

                    sprites_data[form][sprite_type] = high_res_url

    return sprites_data


def parse_sprite_info(url, base_name):
    filename = url.split("/")[-1]
    name_part = filename.replace(".png", "")
    sprite_type = "shiny" if "shiny" in url else "normal"
    form_name = "default"

    if len(name_part) > len(base_name):
        form_name = name_part[len(base_name) + 1 :]

    if form_name == "f":
        form_name = "female"
    elif form_name == "m":
        form_name = "male"

    return (form_name, sprite_type)


def get_location_info(soup):
    location_heading = soup.find(
        "h2", string=lambda text: text and "Where to find" in text
    )

    if location_heading:
        location_table = location_heading.find_next("table")

        row_list = location_table.find_all("tr")

        location_data = {}
        for row in row_list:
            game_names = []
            game_header = row.find("th")

            if game_header:
                span_tags = game_header.find_all("span")
                for span in span_tags:
                    name = span.get_text(strip=True)
                    game_names.append(name)

            location_cell = row.find("td")

            location_info = None

            if location_cell:
                location_links = location_cell.find_all("a")
                cell_text = location_cell.get_text(separator=" ", strip=True)

                if "Evolve" in cell_text:
                    location_info = cell_text
                elif "Breed" in cell_text:
                    location_info = cell_text
                elif location_links:
                    location_urls = []
                    for link in location_links:
                        url = link["href"]
                        location_urls.append(url)

                    location_info = location_urls
                else:
                    location_text = location_cell.get_text(strip=True)
                    if location_text == "Trade/migrate from another game":
                        location_info = location_text

            for game in game_names:
                location_data[game] = location_info

        return location_data

    return {}


def get_generation(dex_number):
    if not dex_number:
        return None

    cleaned_dex_number = int(dex_number.lstrip("0"))

    for gen, max_num in GENERATION_BOUNDARIES:
        if cleaned_dex_number <= max_num:
            return gen

    return None


def get_master_pokemon_list():
    endpoint = "https://pokemondb.net/pokedex/all"
    html = fetch_html(endpoint)
    soup = BeautifulSoup(html, "html.parser")

    pokedex_table = soup.find("table", id="pokedex")
    table_body = pokedex_table.find("tbody")
    pokedex_rows = table_body.find_all("tr")

    pokemon_list = []
    for row in pokedex_rows:
        name_cell = row.find("td", class_="cell-name")
        link_tag = name_cell.find("a")

        pokemon_name = link_tag.get_text(strip=True)
        partial_url = link_tag["href"]

        pokemon_list.append({"name": pokemon_name, "url": partial_url})
    return pokemon_list


def save_pokemon_data(data):
    output_dir = "data"
    os.makedirs(output_dir, exist_ok=True)

    pokemon_name = data["name"]

    file_name = f"{pokemon_name.lower().replace(' ', '-')}.json"
    file_path = os.path.join(output_dir, file_name)

    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

    print(f"Successfully saved data to {file_path}")


def main():
    print("Starting the scraper...")

    base_url = "https://pokemondb.net"
    master_list = get_master_pokemon_list()

    for pokemon in master_list:
        logger.info(f"Attempting to catch: {pokemon['name']}...")

        full_url = f"{base_url}{pokemon['url']}"
        html = fetch_html(full_url)

        pokemon_data = parse_pokemon_data(html, pokemon["name"])

        if pokemon_data:
            save_pokemon_data(pokemon_data)

        time.sleep(1)


if __name__ == "__main__":
    main()
