import Image from "next/image";
import { useRouter } from 'next/navigation'

import { PokemonType } from "@/app/pokemons/pokemon";
import PokemonTypes from "./pokemonTypes";

interface PokemonCardProps {
  pokemon: PokemonType;
  index?: number;
}

export default function PokemonCard({ pokemon, index }: PokemonCardProps) {

    const router = useRouter();

    const handleClick = () => {
      router.push(`/pokemons/${pokemon.id}`);
    };

  return (
    <div 
    onClick={handleClick} 
    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg"
    >
        { index && (
        <div className="self-start">
            <span className="text-sm font-semibold text-gray-500">#{index}</span>
        </div>
        )}
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={50}
        height={50}
        className="rounded-full"
      />
      <h2 className="mt-4 text-xl font-bold text-center">{pokemon.name}</h2>
        <PokemonTypes pokemonType={pokemon.types} />
    </div>
  );
}
