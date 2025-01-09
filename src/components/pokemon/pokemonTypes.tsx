import Image from "next/image";

import { TypeType } from "@/app/pokemons/pokemon";


export default function PokemonType({ pokemonType }: { pokemonType: TypeType[] }) {
  return (
    <div className="flex flex-row items-center justify-center mt-2 space-x-2">
      {pokemonType.map((type: TypeType) => (
        <Image
          key={type.id}
          src={type.image}
          alt={type.name}
          width={20}
          height={20}
          className="rounded-full"
        />
        ))}
    </div>
  );
  
}