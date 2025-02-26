import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_TO_TEAM } from "../utils/mutations";
import "../styles/Party.css";

interface IPokemon {
  _id: string;
  pokemonId: string;
  name: string;
  front_sprite: string;
  back_sprite: string;
}

export const Party = () => {
  const { data, refetch } = useQuery(QUERY_ME);
  const [addToTeam] = useMutation(ADD_TO_TEAM);

  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  // if (loading) return <p>Loading...</p>;

  const user = data?.Me;
  const team: IPokemon[] = user?.team || [];
  console.log(team);
  // const box: IPokemon[] = user?.box || [];

  const handleAddToTeam = async (pokemonId: string) => {
    if (selectedPokemon !== null) {
      try {
        await addToTeam({
          variables: { input: { pokemonId }, _id: pokemonId },
        });
        refetch();
        setSelectedPokemon(null);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div className="team-pokemon">
      <div>
        <h2>My Team</h2>

        <div id="team-row1">
          {team.map(
            (
              pokemon
              // index: number
            ) => (
              <span
                key={pokemon._id}
                id={`team-spot${pokemon._id + 1}`}
                // onClick={() => setSelectedPokemon(pokemon + 1)}
                className={selectedPokemon === pokemon._id ? "selected" : ""}
              >
                <img
                  // src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"
                  src={pokemon.front_sprite} alt={pokemon.name}
                  onClick={() => handleAddToTeam(pokemon.pokemonId)}
                />
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};
