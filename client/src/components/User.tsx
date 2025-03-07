// import { useState } from 'react';
import { useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

export const User: React.FC = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const activeUser = data?.Me || {};
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);


  useEffect(() => {
    refetch();
  }, []);

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

  return (
    <>

          {/* Login Validation */}
          {isLoggedIn && loading === false && reload === false && (
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
                  color: "#FFFFFF",
                  marginLeft: "1rem"
                }}
              >
                Welcome, {activeUser.first_name}!
              </h2>
            </div>
          ) }
    </>
  );
};
