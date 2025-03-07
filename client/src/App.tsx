import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Button, ConfigProvider, Layout } from 'antd';
import Auth from "./utils/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavOptions from "./components/Menu";
import arecuestlogo from "./assets/arceusteralogotransparent.png";
import { User } from "./components/User"
import { LogoutOutlined } from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;


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

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useLayoutEffect(() => {
    const loggedIn = Auth.loggedIn();
    if (loggedIn === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const logout = () => {
    Auth.logout();
    setIsLoggedIn(false);
    navigate("/login");
  };


  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              triggerBg: "#682222",
            },
            Card: {

            },
            Button: {
              defaultBg: "#682222",
              defaultHoverBg: "#FFFFFF",
              defaultHoverBorderColor: "#FFFFFF",
              defaultHoverColor: "#000000"
            }
          },
          token: {
            colorBgContainer: "#000000",
            colorText: "#FFFFFF"
          }
        }}
      >
        <Layout style={{ minHeight: '100vh' }} >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: "black" }} theme="dark">
            <img src={arecuestlogo} alt="Areuest Era" style={{ width: "4rem", height: "4rem", margin: "1rem" }} />
            <User />
            {isLoggedIn && !collapsed &&
              <Button
                key="logout"
                variant="solid"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => logout()}
              >
               <LogoutOutlined /> Logout
              </Button>
            }
            {isLoggedIn && collapsed &&
              <Button
                key="logout"
                variant="solid"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => logout()}
              >
               <LogoutOutlined />
              </Button>
            }
            <NavOptions />
          </Sider>
          <Layout>
            <Content style={{ margin: '0' }}>
              <Outlet />
            </Content>
            <Footer style={{ background: "black", color: "white", textAlign: 'center' }}>
              Arceust Era © 2025 - {new Date().getFullYear()} <br />
              Created with love by jsparrowio, zlacore, k3strl, and KTek4
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </ApolloProvider>

  );
}

export default App;
