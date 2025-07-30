import Image from 'next/image'
import { Pokemon } from '../types'

type PokemonCardProps = {
    pokemon: Pokemon;
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    return(
        <button className="bg-brand-dark text-brand-light border border-brand-border flex flex-col items-center p-4 gap-2 rounded-lg transistion-colors hover:border-brand-red">
            <div>{pokemon.name}</div>
            <div>{pokemon.dex_number}</div>
            <Image
                src={pokemon.pokemon_sprites.default.normal}
                alt={pokemon.name}
                width={96}
                height={96}
            />
        </button>
    )
}