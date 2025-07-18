import requests
from bs4 import BeautifulSoup
from constants import VERSION_TO_GENERATION
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
endpoint = "https://pokemondb.net/pokedex/bulbasaur"

def fetch_html(url):
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        logger.info(f"Request was successful. Status: {r.status_code}")
        return r.text
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch {url}. Reason: {e}")
        return None
    
def parse_pokemon_data(html):
    soup = BeautifulSoup(html, 'html.parser')
    
    name = get_name(soup)
    dex_number = get_dex_number(soup)
    pokemon_types = get_typing(soup)
    pokemon_sprites = get_sprites(soup)
    location_data = get_location_info(soup)

    # TODO generation = get_generation(dex_number)

    return location_data

def get_name(soup):
    selector = '#main h1'
    element = soup.select_one(selector)
    if element:
        return element.text

def get_dex_number(soup):
    number_header = soup.find('th', string='National №')
    dex_number = None

    if number_header:
        number_cell = number_header.find_next_sibling('td')
        if number_cell:
            dex_number = number_cell.get_text(strip=True)
    return dex_number

def get_typing(soup):
    type_header = soup.find('th', string='Type')
    pokemon_types = []

    if type_header:
        type_cell = type_header.find_next_sibling('td')
        if type_cell:
            type_links = type_cell.find_all('a')
            pokemon_types = [link.get_text(strip=True) for link in type_links]
    
    return pokemon_types

def get_sprites(soup):
    sprite_page_link = soup.find('a', string=lambda t: t and 'See all' in t and 'sprites' in t)
    if not sprite_page_link:
        logger.error("Could not find the link to the sprites page.")
        return []
    
    partial_url = sprite_page_link['href']
    full_url = f"https://pokemondb.net{partial_url}"
    
    sprite_page_html = fetch_html(full_url)
    if not sprite_page_html:
        logger.error(f"Could not fetch the sprite page HTML from {full_url}")
        return []
    
    sprite_soup = BeautifulSoup(sprite_page_html, 'html.parser')

    sprite_sources = []
    home_label_cell = sprite_soup.find('td', string=lambda text: text and 'Home' in text)
    
    if home_label_cell:
        sibling_cells = home_label_cell.find_next_siblings('td')
    
        for cell in sibling_cells:
            image_tag = cell.select_one('a > img')
            if image_tag:
                sprite_sources.append(image_tag['src'])
    
    return sprite_sources

def get_location_info(soup):
    location_heading = soup.find('h2', string=lambda text: text and 'Where to find' in text)

    if location_heading:
        location_table = location_heading.find_next('table')

    row_list = location_table.find_all('tr')
    
    location_data = {}
    for row in row_list:
        game_names = []
        game_header = row.find('th')
        
        if game_header:
            span_tags = game_header.find_all('span')
            for span in span_tags:
                name = span.get_text(strip=True)
                game_names.append(name)
        
        location_cell = row.find('td')

        location_info = None

        if location_cell:
            location_links = location_cell.find_all('a')

            if location_links:
                location_urls = []
                for link in location_links:
                    url = link['href']
                    location_urls.append(url)

                location_info = location_urls
            else:
                location_info = location_cell.get_text(strip=True)

        for game in game_names:
            location_data[game] = location_info
    
    return location_data

def main():
    logging.basicConfig(level=logging.INFO)
    print("Starting the scraper...")
    html = fetch_html(endpoint)
    print(parse_pokemon_data(html))

if __name__ == "__main__":
    main()
