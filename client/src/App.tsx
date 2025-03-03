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
  return (
    <ApolloProvider client={client}>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        {/* Sidebar Component */}
        <Sidebar onToggle={setSidebarCollapsed} />

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            marginLeft: sidebarCollapsed ? "80px" : "175px",
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          {/* Header Component */}
          <Header />

          {/* Main Content */}
          <main
            style={{
              marginLeft: sidebarCollapsed ? "80px" : "175px",
              transition: "margin 0.3s ease-in-out",
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
