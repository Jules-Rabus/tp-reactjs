import { StatsType } from "@/app/pokemons/pokemon"


export default function PokemonStats({ stats }: { stats: StatsType }) {
  return (
    <>
        <h2 className="text-2xl font-bold">Statistiques</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
                <p className="font-semibold">HP</p>
                <p>{stats.HP}</p>
            </div>
            <div>
                <p className="font-semibold">Attaque</p>
                <p>{stats.attack}</p>
            </div>
            <div>
                <p className="font-semibold">Défense</p>
                <p>{stats.defense}</p>
            </div>
            <div>
                <p className="font-semibold">Attaque Spéciale</p>
                <p>{stats.specialAttack}</p>
            </div>
            <div>
                <p className="font-semibold">Défense Spéciale</p>
                <p>{stats.specialDefense}</p>
            </div>
        </div>
    </>
  );
     
}
