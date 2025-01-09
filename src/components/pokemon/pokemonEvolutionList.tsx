import { PokemonType } from "@/app/pokemons/pokemon"
import PokemonCard from "./pokemonCard"

export default function PokemonEvolutionList({ evolutions }: { evolutions: PokemonType[] }) {

    return (
        <>
            <h3>Évolutions :</h3>
            { evolutions.length === 0 && (
                <p>Ce Pokémon n&apos;a pas d&apos;évolution</p>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {evolutions.map((pokemon) => (
                    <div key={pokemon.id}>
                        <PokemonCard pokemon={pokemon} />
                    </div>
                ))}
            </div>
        </>
    );
}