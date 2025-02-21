// import { useState } from 'react';
import { Link } from "react-router-dom";


export const Header: React.FC = () => {

  return (
    <div className="headerdiv">
      <header>
        <h1>Arceust Era</h1>
        <nav className='nav-bar'>
          <Link to="/">Home</Link>
          <Link to="/cave">Cave</Link>
          <Link to="/beach">Beach</Link>
          <Link to="/grass">Grass</Link>
          <Link to="/party">Party</Link>
          <Link to="pokecenter">Pokecenter</Link>
        </nav>
      </header>
    </div>
  );
} 