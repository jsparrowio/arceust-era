import { useState } from 'react';
import "../styles/Party.css";

export const Party = () => {

  
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  return (
    <div className="team-pokemon">
      <div>
        <h2>My Team</h2>
        <div id="team-row1">
          <span id="team-spot1"
          onClick={() => setSelectedSpot(1)} 
          className={selectedSpot === 1 ? 'selected' : ''}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"/>
          </span>
          <span id="team-spot2"
          onClick={() => setSelectedSpot(2)} 
          className={selectedSpot === 2 ? 'selected' : ''}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"/>
          </span>
          <span id="team-spot3"
          onClick={() => setSelectedSpot(3)} 
          className={selectedSpot === 3 ? 'selected' : ''}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"/>
          </span>
        </div>
        <div id="team-row2">
          <span id="team-spot4"
          onClick={() => setSelectedSpot(4)} 
          className={selectedSpot === 4 ? 'selected' : ''}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"/>
          </span>
          <span id="team-spot5"
          onClick={() => setSelectedSpot(5)} 
          className={selectedSpot === 5 ? 'selected' : ''}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"/>
          </span>
          <span id="team-spot6"
          onClick={() => setSelectedSpot(6)} 
          className={selectedSpot === 6 ? 'selected' : ''}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png"/>
          </span>
        </div>
      </div>
    </div>
  );
};
