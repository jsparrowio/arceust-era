// import { useState } from 'react';
import { Link } from "react-router-dom";


export const Header: React.FC= () => {
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  // const {currentUser, setCurrentUser} = useUser();

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
               <Link to="pokecenter">Pokecenter</Link>
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
} 