import Image from "next/image";
import {Pokemon} from '../types';

async function getPokemonList(): Promise<Pokemon[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/pokemon`;
  const res = await fetch(apiUrl, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch the Pokemon list from the API.');
  }

  return res.json();
}

export default async function Home() {
  const pokemonList = await getPokemonList();
  return (
    <main>
      <h1>Pokemon List</h1>
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </main>
  );
}
