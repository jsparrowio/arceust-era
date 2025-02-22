// import { useState } from 'react';
import { Link } from "react-router-dom";


export const Header: React.FC = () => {

  return (
      <header className='headerdiv'>
        <h1 className='header'>Arceust Era</h1>
        <nav className='nav-bar'>
          <Link className='link' to="/">Home</Link>
          <Link className='link' to="/cave">Cave</Link>
          <Link className='link' to="/beach">Beach</Link>
          <Link className='link' to="/grass">Grass</Link>
          <Link className='link' to="/party">Party</Link>
          <Link className='link' to="/pokecenter">Pokecenter</Link>
          {/* <Link className='link' to="/bag">Bag</Link> */}

        </nav>
      </header>
  );
} 