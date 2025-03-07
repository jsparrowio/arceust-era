
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  HomeOutlined,
  CompassOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  FilterOutlined,
  SunOutlined,
  WechatOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

function NavOptions() {
  const { loading, refetch } = useQuery(QUERY_ME);
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
  const nav = useNavigate();

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['/']}
      mode="inline"
      onClick={({ key }) => {
        nav(key);
      }}
      style={{
        marginLeft: "0.5em",
        marginTop: "0.5em",
        textAlign: "left",
        background: "black"
      }}
      items={
        isLoggedIn && loading === false && reload === false ? [
          {
            label: "Home", key: "/",
            style: {
              backgroundColor: "#682222",
            },
            icon: <HomeOutlined />
          },
          {
            label: "Safari Zone",
            key: "safari-zone",
            style: {
              backgroundColor: "#682222",
            },
            icon: <CompassOutlined />,
            children: [
              {
                label: "Cave",
                key: "/safari-zone/cave",
                style: {
                  backgroundColor: "#682222",
                },
                icon: <FilterOutlined />,
              },
              {
                label: "Beach",
                key: "/safari-zone/beach",
                style: {
                  backgroundColor: "#682222",
                },
                icon: <SunOutlined />,
              },
              {
                label: "Grass",
                key: "/safari-zone/grass",
                style: {
                  backgroundColor: "#682222",
                },
                icon: <WechatOutlined />,
              },
            ],
          },
          { label: "Party",
            key: "/party", 
            style: {
              backgroundColor: "#682222",
            },
            icon: <TeamOutlined /> },
          {
            label: "Pokecenter",
            key: "/pokecenter",
            style: {
              backgroundColor: "#682222",
            },
            icon: <MedicineBoxOutlined />,
          },
          {
            label: "Inventory",
            key: "/bag",
            style: {
              backgroundColor: "#682222",
            },
            icon: <ShoppingOutlined />,
          },
          {
            label: "Profile",
            key: "/usersettings",
            style: {
              backgroundColor: "#682222",
              bottom: 0
            },
            icon: <UserOutlined />,
          },
        ]
          : [
            {
              label: "Home", key: "/",
              style: {
                backgroundColor: "#682222",
              },
              icon: <HomeOutlined />
            },
            {
              label: "Login",
              key: "/login",
              style: {
                backgroundColor: "#682222",
              },
              icon: <UserOutlined />,
            },
          ]

      }
    />
  );
}

export default NavOptions;
