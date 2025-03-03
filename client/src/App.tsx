import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
// import auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const isLoggedIn = auth.loggedIn();
  return (
    <ApolloProvider client={client}>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        {/* Sidebar Component, supposed to hide if the user is not logged in */}
        {/* {isLoggedIn && <Sidebar onToggle={setSidebarCollapsed} />} */}
        <Sidebar onToggle={setSidebarCollapsed} />

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "margin-left 0.3s ease-in-out",
            paddingLeft: sidebarCollapsed ? "0px" : "80px",
          }}
        >
          {/* Header Component */}
          <Header />

          {/* Main Content */}
          <main
            style={{
              width: "100%",
              maxWidth: "1200px",
              padding: "15px",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
