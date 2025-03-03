import "../App.css";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  CompassOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  FilterOutlined,
  SunOutlined,
  WechatOutlined,
  MenuOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

// interface SidebarProps {
//     onToggle: (collapsed: boolean) => void;
//     onLogout: () => void;
// }

function Sidebar({ onToggle }: { onToggle: (collapsed: boolean) => void }) {
  const nav = useNavigate();
  const [closed, setClosed] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setClosed(!closed);
    onToggle(!closed);
  };

  //   const isSafariSelected = location.pathname.startsWith("/safari-zone");

  useEffect(() => {
    const handleResize = () => setClosed(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "15px",
        left: "15px",
        height: "calc(100vh -30px)",
        width: closed ? "80px" : "175px",
        transition: "width 0.3s ease-in-out",
        backgroundColor: "#682222",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        zIndex: "1000",
      }}
    >
      {/* Menu Icon for Collapsing the Sidebar */}
      <MenuOutlined
        onClick={toggleSidebar}
        style={{
          fontSize: "24px",
          color: "#af4848",
          backgroundColor: "#682222",
          cursor: "pointer",
          padding: "15px",
          width: "100%",
          display: "block",
          textAlign: "center",
        }}
      />

      {/* Sidebar Main, hide when collapsed */}
      {!closed && (
        <Menu
          mode="vertical"
          className="custom-menu"
          inlineCollapsed={closed}
          onClick={({ key }) => {
              nav(key);
          }}
          style={{
            width: "100%",
            textAlign: "left",
            height: "100%",
            borderRight: "none",
            backgroundColor: "transparent",
          }}
          items={
            !closed
              ? [
                  { label: "Home", key: "/", icon: <HomeOutlined /> },
                  {
                    label: "Safari Zone",
                    key: "safari-zone",
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
                    // Will apply the parent background only when the user selects the submenu item
                    // style: isSafariSelected
                    //      {
                    //         backgroundColor: "#682222",
                    //         borderRadius: "8px"
                    //     } : {},
                  },
                  { label: "Party", key: "/party", icon: <TeamOutlined /> },
                  {
                    label: "Pokecenter",
                    key: "/pokecenter",
                    icon: <MedicineBoxOutlined />,
                  },
                  {
                    label: "Inventory",
                    key: "/bag",
                    icon: <ShoppingOutlined />,
                  },
                  {
                    label: "Profile",
                    key: "/usersettings",
                    icon: <UserOutlined />,
                  },
                ]
              : []
          }
        />
      )}
    </div>
  );
}

export default Sidebar;
