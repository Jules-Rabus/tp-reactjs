import PokemonCard from "./pokemonCard";
import { PokemonType } from "@/app/pokemons/pokemon";

export default function PokemonList({ pokemons }: { pokemons: PokemonType[] }) {
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pokemons.map((pokemon, index) => {
        if (index === pokemons.length - 1) {
          return (
            <div key={pokemon.id}>
              <PokemonCard pokemon={pokemon} index={index + 1} />
            </div>
          );
        }
        return <PokemonCard key={pokemon.id} pokemon={pokemon} index={index + 1} />;
      })}
    </div>
  );
}
