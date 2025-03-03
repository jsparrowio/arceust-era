import '../App.css';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
    HomeOutlined,
    CompassOutlined,
    TeamOutlined,
    MedicineBoxOutlined,
    UserOutlined,
    PoweroffOutlined, 
    FilterOutlined,
    SunOutlined,
    WechatOutlined
} from "@ant-design/icons"

function Sidebar () {
    const nav = useNavigate()
    return (
        <div style={{ 
            display: "flex", 
            position: "fixed",
            top: "15px",
            left: "15px"
            }}
            >
            <Menu
            onClick={({key}) => {
                if (key === "signout") {
                    // TODO: sign out feature here
                } else {
                    nav(key);
                }
            }}
            items={[
                {label: "Home", key:'/', icon: <HomeOutlined />},
                {label: "Safari Zone", 
                    key:'safari-zone', 
                    icon: <CompassOutlined />,
                    children: [
                        {label: "Cave", key: '/safari-zone/cave', icon: <FilterOutlined />},
                        {label: "Beach", key: '/safari-zone/beach', icon: <SunOutlined />},
                        {label: "Grass", key: '/safari-zone/grass', icon: <WechatOutlined />},
                    ]
                },
                {label: "Party", key:'/party', icon: <TeamOutlined />},
                {label: "Pokecenter", key:'/pokecenter', icon: <MedicineBoxOutlined />},
                {label: "Profile", key:'/profile', icon: <UserOutlined />},
                {label: "Signout", key: 'signout',icon: <PoweroffOutlined />, danger: true}
            ]}
            ></Menu>
        </div>
    );
}

export default Sidebar;