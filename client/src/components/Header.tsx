// import { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "antd";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Sidebar from "./Sidebar";

export const Header: React.FC = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const activeUser = data?.Me || {};
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);

  useEffect(() => {
    refetch();
  }, []);
  // }, [refetch]);
  // in case this causes issues with Render

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
    navigate("/login");
  };

  return (
    // SideBar Format
    <>
      {isLoggedIn && (
        <Sidebar onToggle={(collapsed) => console.log("Sidebar toggled:", collapsed)} />
      )}

      <header
        className="headerdiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* Main Header Content */}
        <div
          style={{
            flexGrow: 1,
            paddingLeft: "20px",
          }}
        >
          <h1
            className="header"
            style={{
              fontSize: "1.8rem",
              flexGrow: 1,
            }}
          >
            Arceust Era
          </h1>

          {/* Login Validation */}
          {isLoggedIn && loading === false && reload === false ? (
            <div
              className="user"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                }}
              >
                Welcome,
                <Link className="link" to="/usersettings">
                  {activeUser.first_name}
                </Link>
                !
              </h2>
              <Button
                key="logout"
                variant="solid"
                color="default"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button key="login" variant="solid" color="default">
                Login
              </Button>
            </Link>
          )}
          {/* Navigation Links */}
          <nav className="nav-bar">
            <Link className="link" to="/">
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link className="link" to="/safari-zone/cave">
                  Cave
                </Link>
                <Link className="link" to="/safari-zone/beach">
                  Beach
                </Link>
                <Link className="link" to="/safari-zone/grass">
                  Grass
                </Link>
                <Link className="link" to="/party">
                  Party
                </Link>
                <Link className="link" to="/pokecenter">
                  Pokecenter
                </Link>
                <Link className="link" to="/bag">
                  Bag
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};
