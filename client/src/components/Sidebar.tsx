import "../App.css";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  HomeOutlined,
  CompassOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  PoweroffOutlined,
  FilterOutlined,
  SunOutlined,
  WechatOutlined,
  MenuOutlined,
} from "@ant-design/icons";

function Sidebar() {
  const nav = useNavigate();
  const [closed, setClosed] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "15px",
        left: "15px",
        height: "calc(100vh -30px)",
        width: closed ? "80px" : "175px",
        borderRadius: "10px",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Menu Icon for Collapsing the Sidebar */}
      <MenuOutlined
        onClick={() => setClosed(!closed)}
        style={{
          fontSize: "24px",
          color: "#af4848",
          backgroundColor: "#682222",
          cursor: "pointer",
          marginBottom: "0",
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
          if (key === "signout") {
            // TODO: sign out feature here
          } else {
            nav(key);
          }
        }}
        style={{
          width: closed ? "80px" : "175px",
          textAlign: "left",
          height: "100%",
          borderRight: "none",
          backgroundColor: "transparent",
        }}
        items={[
          { label: "Home", key: "/", icon: <HomeOutlined /> },
          {
            label: "Safari Zone",
            key: "safari-zone",
            icon: <CompassOutlined />,
            children: [
              {
                label: "Cave",
                key: "/safari-zone/cave",
                icon: <FilterOutlined />,
              },
              {
                label: "Beach",
                key: "/safari-zone/beach",
                icon: <SunOutlined />,
              },
              {
                label: "Grass",
                key: "/safari-zone/grass",
                icon: <WechatOutlined />,
              },
            ],
          },
          { label: "Party", key: "/party", icon: <TeamOutlined /> },
          {
            label: "Pokecenter",
            key: "/pokecenter",
            icon: <MedicineBoxOutlined />,
          },
          { label: "Profile", key: "/profile", icon: <UserOutlined /> },
          {
            label: "Signout",
            key: "signout",
            icon: <PoweroffOutlined />,
            danger: true,
          },
        ]}
      ></Menu>
    )}
    </div>
  );
}

export default Sidebar;
