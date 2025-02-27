// import { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "antd";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

export const Header: React.FC = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const activeUser = data?.Me || {};
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);

  useEffect(() => {
    refetch();
  }, [])

  useLayoutEffect(() => {
    setReload(true);
    refetch();
    const loggedIn = Auth.loggedIn();
    if (loggedIn === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setReload(false);
  }, [location]);

  const logout = () => {
    Auth.logout();
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
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
            <Link className='link' to="/grass">Grass</Link>
            <Link className='link' to="/party">Party</Link>
            <Link className='link' to="/pokecenter">Pokecenter</Link>
            {/* <Link className='link' to="/bag">Bag</Link> */}
          </>
        ) 
      }
      </nav>
    </header>
  );
} 