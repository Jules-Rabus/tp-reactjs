// /app/pokemons/[id]/page.tsx
"use client";

import { useParams, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { z } from 'zod';

import { PokemonType, pokemonSchema, EvolutionType } from '@/app/pokemons/pokemon';

import PokemonCard from '@/components/pokemon/pokemonCard';
import PokemonStats from '@/components/pokemon/pokemonStats';
import PokemonEvolutionList from '@/components/pokemon/pokemonEvolutionList';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getEvolutionChain = (evolutionChain: EvolutionType[], pokemons: PokemonType[]): PokemonType[] => {
  const chain = evolutionChain.map((evolution) => {
    const foundPokemon = pokemons.find((p) => p.id === evolution.pokedexId);

    if (!foundPokemon) {
      throw new Error(`Aucun Pokémon trouvé avec l'identifiant ${evolution.pokedexId}`);
    }
    return foundPokemon;
  });

  return chain;
}

export default function PokemonDetail() {
  const params = useParams();
  const { id } = params;

  // Je n'ai pas eu le temps de faire un layout pour avoir un vrai header
  const router = useRouter();

  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/pokemons`);
        if (!res.ok) {
          throw new Error('Échec de la récupération des données des Pokémons');
        }
        const json = await res.json();
        const parsedPokemons = z.array(pokemonSchema).parse(json);

        setPokemons(parsedPokemons);

        const foundPokemon = parsedPokemons.find((p) => p.id === Number(id));

        if(!foundPokemon) {
          throw new Error(`Aucun Pokémon trouvé avec l'identifiant ${id}`);
        }

        setPokemon(foundPokemon);
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error(e.errors);
          setError("Erreur de validation des données du Pokémon.");
        } else {
          console.error(e);
          setError("Une erreur est survenue lors de la récupération des données.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  const handleClick = () => {
    router.push(`/pokemons`);
  };

  if (isLoading) return <div className="text-center">Chargement du Pokémon...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!pokemon) return <div className="text-center">Aucun Pokémon trouvé.</div>;

  return (
    <>
      <button onClick={handleClick} className="bg-blue-500 text-white p-2 rounded-lg">Retour au Pokédex</button>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center">{pokemon.name}</h1>
        <PokemonCard pokemon={pokemon}/>
        <PokemonStats stats={pokemon.stats}/>
        <PokemonEvolutionList evolutions={getEvolutionChain(pokemon.evolutions, pokemons)} />
      </div>
    </>
  );
}

