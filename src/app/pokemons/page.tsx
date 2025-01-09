"use client";

import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import Select from 'react-select';
import { MultiValue } from 'react-select';


import PokemonList from "@/components/pokemon/pokemonList";

import { PokemonType, PokemonsSchema, TypeType, TypesSchema  } from "@/app/pokemons/pokemon";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SelectedType {
  value: number;
  label: string;
}

export default function Pokemons() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [types, setTypes] = useState<TypeType[]>([]);
  const [currentTypes, setCurrentTypes] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(50);
  const [searchName, setSearchName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPokemons = useCallback(async () => {
    setIsLoading(true);

    try {
      console.log("fetching pokemons");
      
      const currentLimit = limit * page;
      const queryParametersTypes = currentTypes.map((type) => `types=${type}`).join("&");
      const queryParameters = `?page=${page}&name=${searchName}&limit=${currentLimit}&${queryParametersTypes}`;
      console.log(queryParameters);

      const res = await fetch(`${API_URL}/pokemons${queryParameters}`);

      const json = await res.json();
      const parsedPokemons = PokemonsSchema.parse(json);

      setPokemons( searchName ? parsedPokemons.slice(0, currentLimit) : parsedPokemons);
  
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.error(e.errors);
        setError("Erreur de validation des données des Pokémon.");
      } else {
        console.error(e);
        setError("Une erreur est survenue lors de la récupération des données : Pokémons");
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, searchName, currentTypes]);

  const fetchTypes = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/types`);
      const json = await res.json();
      const parsedTypes = TypesSchema.parse(json);

      setTypes(parsedTypes);
      console.log(parsedTypes);
    } catch (e) {
      if(e instanceof z.ZodError) {
        console.error(e.errors);
        setError("Erreur de validation des données des types");
      }
      else {
        console.error(e);
        setError("Une erreur est survenue lors de la récupération des données : Types");
      }
    }
  }
  , []);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPokemons([]);
    setPage(1);
    setLimit(parseInt(event.target.value, 10));
  };

  
  const handleTypesChange = (selectedTypes: MultiValue<SelectedType>) => {
    setPage(1);
    setCurrentTypes(selectedTypes.map((type) => type.value));
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchName(event.target.value);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="bg-gray-800 text-black text-center p-4">
        <h1 className="text-white" >Pokédex Jules RABUS</h1>
        <div className="flex justify-center items-center gap-4 mt-2">
          <input
            type="text"
            placeholder="Rechercher un Pokémon"
            className="p-2 rounded-lg text-black"
            onChange={handleSearchChange}
          />
          <Select
            options={types.map((type) => ({ value: type.id, label: type.name }))}
            onChange={handleTypesChange}
            isMulti
            isSearchable
            isClearable
          />
          <select
            value={limit}
            onChange={handleLimitChange}
            className="p-2 rounded-lg text-black"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <PokemonList pokemons={pokemons} />
      { !isLoading && pokemons.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-gray-800 text-white p-2 rounded-lg mt-4"
          >
            Charger plus de Pokémons
          </button>
        </div>
      )}
      { !isLoading && pokemons.length === 0 && <div className="text-center">Aucun Pokémon trouvé</div> }
      {isLoading && <div className="text-center">Chargement des Pokémons...</div>}
    </>
  );
}
