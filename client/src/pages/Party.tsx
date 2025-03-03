import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { UPDATE_TEAM } from "../utils/mutations";
import "../styles/Party.css";

interface IPokemon {
  _id: string;
  pokemonId: string;
  name: string;
  front_sprite: string;
  back_sprite: string;
}

export const Party = () => {
  const { data } = useQuery(QUERY_ME);
  const [updateTeam] = useMutation(UPDATE_TEAM);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [team, setTeam] = useState<IPokemon[]>([]);

  useEffect(() => {
    if (data?.Me?.team) {
      setTeam(data.Me.team);
    }
  }, [data]);

  // console.log("team");
  // console.log(team);

  const movePokemon = (direction: string) => {
    if (selectedPokemon !== null) {
      const index = team.findIndex(
        (pokemon) => pokemon._id === selectedPokemon
      );
      if (index !== -1) {
        let newIndex = index;
        if (direction === "up" && index >= 3) newIndex -= 3;
        if (direction === "down" && index < 3) newIndex += 3;
        if (direction === "left" && index % 3 !== 0) newIndex -= 1;
        if (direction === "right" && index % 3 !== 2) newIndex += 1;

        if (newIndex !== index) {
          const newTeam = [...team];
          [newTeam[index], newTeam[newIndex]] = [
            newTeam[newIndex],
            newTeam[index],
          ];
          setTeam(newTeam);
          // Update the team state and refetch the data
          // This part depends on how we update the team on the server
          // For now, just log the new team
          // console.log(newTeam);
        }
      }
    }
  };

  const handleUpdateTeam = async () => {
    try {
      await updateTeam({ variables: { id: team[0]._id } });
      console.log("Team updated successfully!");
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  const handleResetTeam = async () => {
    // try {
    //   await updateTeam({ variables: { id: data.Me._id, team } });
    //   console.log("Team updated successfully!");
    // } catch (error) {
    //   console.error("Error updating team:", error);
    // }
  };

  return (
    <div>
      <div>
        <h1>My Team</h1>
        <div id="team-row1">
          {team.slice(0, 3).map((pokemon, index) => (
            <span
              key={pokemon._id}
              id={`team-spot${index + 1}`}
              onClick={() => setSelectedPokemon(pokemon._id)}
              className={selectedPokemon === pokemon._id ? "selected" : ""}
            >
              <img src={pokemon.front_sprite} alt={pokemon.name} />
            </span>
          ))}
        </div>
        <div id="team-row2">
          {team.slice(3, 6).map((pokemon, index) => (
            <span
              key={pokemon._id}
              id={`team-spot${index + 4}`}
              onClick={() => setSelectedPokemon(pokemon._id)}
              className={selectedPokemon === pokemon._id ? "selected" : ""}
            >
              <img src={pokemon.front_sprite} alt={pokemon.name} />
            </span>
          ))}
        </div>
      </div>

      <div className="team-controls">
        <button onClick={() => movePokemon("up")}>↑</button>
        <button onClick={() => movePokemon("left")}>←</button>
        <button onClick={() => movePokemon("down")}>↓</button>
        <button onClick={() => movePokemon("right")}>→</button>
      </div>

      <div className="update-team">
        <button onClick={handleUpdateTeam}>Save Team</button>
      </div>

      <div className="reset-team">
        <button onClick={handleResetTeam}>Reset Team</button>
      </div>
    </div>

    //   <div className="header">

    //     <div>
    //       <h2>My Team</h2>

    //       <div id="team-row1">
    //         {team.map(
    //           (
    //             pokemon
    //             // index: number
    //           ) => (
    //             <span
    //               key={pokemon._id}
    //               id={`team-spot${pokemon._id + 1}`}
    //               onClick={() => setSelectedPokemon(pokemon._id)}
    //               className={selectedPokemon === pokemon._id ? "selected" : ""}
    //             >
    //               <img
    //                 // src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"
    //                 src={pokemon.front_sprite} alt={pokemon.name}
    //                 onClick={() => handleAddToTeam(pokemon.pokemonId)}
    //               />
    //             </span>
    //           )
    //         )}
    //       </div>
    //     </div>
    //   </div>
  );
};
