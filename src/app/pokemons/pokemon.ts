import { z } from "zod";

export const statsSchema = z.object({
  HP: z.number(),
  attack: z.number(),
  defense: z.number(),
  specialAttack: z.number(),
  specialDefense: z.number(),
});

export const typeSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
});

export const evolutionSchema = z.object({
  name: z.string(),
  pokedexId: z.number(),
});

export const pokemonSchema = z.object({
  id: z.number(),
  pokedexId: z.number(),
  name: z.string(),
  image: z.string(),
  sprite: z.string(),
  stats: statsSchema,
  generation: z.number(),
  evolutions: z.array(evolutionSchema),
  types: z.array(typeSchema),
});

export const PokemonsSchema = z.array(pokemonSchema);
export const TypesSchema = z.array(typeSchema);

export type StatsType = z.infer<typeof statsSchema>;
export type TypeType = z.infer<typeof typeSchema>;
export type EvolutionType = z.infer<typeof evolutionSchema>;
export type PokemonType = z.infer<typeof pokemonSchema>;
