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

<<<<<<< HEAD
  // const openLoginModal = () => {
  //   setIsLoginModalOpen(true);
  // };

  // const closeLoginModal = () => {
  //   setIsLoginModalOpen(false);
  // };

  // const openSignupModal = () => {
  //   setIsSignupModalOpen(true);
  // };

  // const closeSignupModal = () => {
  //   setIsSignupModalOpen(false);
  // };

  // const handleLoginSuccess = (username: string) => {
  //   setCurrentUser({ username });
  //   console.log('Current User:', currentUser);
  //   closeLoginModal();
  // };

  // const handleLogout = () => {
  //   setCurrentUser(null);
  // };

    return (
        <div className='header'>
            <header>
          <h1>Placeholder</h1>
          <nav className='nav-bar'>
               <Link to="/">Home</Link>
               <Link to="/cave">Cave</Link>
               <Link to="/beach">Beach</Link>
               <Link to="/grass">Grass</Link>
               <Link to="/party">Party</Link>
               <Link to="/pokecenter">Pokecenter</Link>
            </nav>
            </header>
          {/* <div className='top-header'> 
          <a href="/"><img className='logo' src={TTNGLOGO}></img></a>
          <div className='header-btn'>
           {currentUser ? (
            <>
              <span className='welcome'>Welcome, {currentUser.username}</span>
              <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </>
            ) : (
            <>
              <button className='login-btn' onClick={openLoginModal}>Login</button>
              <button className='signup-btn' onClick={openSignupModal}>Sign Up</button>
            </>
          )}
          </div>

          </div> 
          <nav className='nav-bar'>
             <Link to="/">Home</Link>
             <Link to="/profile">My Profile</Link>
             <Link to="/exercise">Exercise</Link>
             <Link to="/meals">Meals</Link>
          </nav>
          {isLoginModalOpen && <LoginModal onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />}
          {isSignupModalOpen && <CreateProfileModal onClose={closeSignupModal} onSuccessfulRegister={openLoginModal} />} */}

        </div>
    );
=======
  return (
    <header className='headerdiv'>
      <h1 className='header'>Arceust Era</h1>
      {isLoggedIn && loading === false && reload === false? (
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
        <Link className='link' to="/cave">Cave</Link>
        <Link className='link' to="/beach">Beach</Link>
        <Link className='link' to="/grass">Grass</Link>
        <Link className='link' to="/party">Party</Link>
        <Link className='link' to="/pokecenter">Pokecenter</Link>
        {/* <Link className='link' to="/bag">Bag</Link> */}

      </nav>
    </header>
  );
>>>>>>> 535e9624b9151106e5253a4490cd0cd460546b2f
} 