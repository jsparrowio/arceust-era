// import { useState } from 'react';
import { Link } from "react-router-dom";


export const Header: React.FC = () => {

  return (
<<<<<<< HEAD
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
=======
    <header className='headerdiv'>
      <h1 className='header'>Arceust Era</h1>
      {isLoggedIn && loading === false && reload === false ? (
        <div className="user">
          <h2>Welcome,<Link className='link' to="/usersettings">{activeUser.first_name}</Link>!</h2>
          <Button
            key='logout'
            variant="solid"
            color="default"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/login">
          <Button
            key='login'
            variant="solid"
            color="default"
          >Login</Button>
        </Link>
      )}
      <nav className='nav-bar'>
        <Link className='link' to="/">Home</Link>
        {isLoggedIn && (
          <>
            <Link className='link' to="/cave">Cave</Link>
            <Link className='link' to="/beach">Beach</Link>
            <Link className='link' to="/grass">Forest</Link>
            <Link className='link' to="/party">Party</Link>
            <Link className='link' to="/pokecenter">Pokecenter</Link>
            <Link className='link' to="/bag">Bag</Link>
          </>
        ) 
      }
      </nav>
    </header>
>>>>>>> 2decfe4bb585c8a9509d67e0b3a0797f87bc448e
  );
} 