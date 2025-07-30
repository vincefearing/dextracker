import {Pokemon} from '../types';
import PokemonCard from '../components/PokemonCard'
import GameboyGraphic from '@/components/GameboyGraphic';

type PokemonSummary = {
  name: string;
  url: string;
}

async function getPokemonList(): Promise<Pokemon[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/pokemon`;
  
  const summaryRes = await fetch(apiUrl, { cache: 'no-store' });
  if (!summaryRes.ok) {
    throw new Error('Failed to fetch the Pokemon list from the API.');
  }

  const pokemonSummaryList: PokemonSummary[] = await summaryRes.json()

  const pokemonDetailPromises = pokemonSummaryList.map(pokemon =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${pokemon.url}`, { cache: 'no-store'})
  )

  const pokemonDetailResponses = await Promise.all(pokemonDetailPromises);

  const jsonPromises = pokemonDetailResponses.map(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details for a Pokémon.`);
    }
    return response.json();
  });

  const pokemonList: Pokemon[] = await Promise.all(jsonPromises);

  return pokemonList;
}

export default async function Home() {
  const pokemonList = await getPokemonList();
  return (
    <main className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 h-screen lg:h-auto">
        <GameboyGraphic/>
      </div>
      <div className="lg:w-1/2 bg-brand-dark">
        {}
      </div>
    </main>
  );
}
