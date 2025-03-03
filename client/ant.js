import { Route, Routes } from 'react-router-dom';
import './src/App.css';
import { Menu } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { 
    HomeOutlined,
    CompassOutlined,
    TeamOutlined,
    MedicineBoxOutlined,
    UserOutlined,
    PowerOffOutlined 
} from "@ant-design/icons"

function Sidebar () {
    const nav = useNavigate()
    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
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
                // TODO: After clicking Safari Zone, it should drop down to reveal the clickable zones
                {label: "Safari Zone", key:'/safari-zone', icon: <CompassOutlined />},
                {label: "Pokemon Boxes", key:'/pokemon-boxes', icon: <TeamOutlined />},
                {label: "Pokemon Center", key:'/pokemon-center', icon: <MedicineBoxOutlined />},
                {label: "Profile", key:'/profile', icon: <UserOutlined />},
                {label: "Signout", key: 'signout',icon: <PowerOffOutlined />, danger: true}
            ]}
            ></Menu>
            <Content />
        </div>
    );
}

function Content () {

    return <div>
        <Routes>
            <Route path='/' element={<div>Home</div>}></Route>
            <Route path='/safari-zone' element={<div>Safari Zone</div>}></Route>
            <Route path='/pokemon-boxes' element={<div>Pokemon Boxes</div>}></Route>
            <Route path='/pokemon-center' element={<div>Pokemon Center</div>}></Route>
            <Route path='/profile' element={<div>Profile</div>}></Route>
        </Routes>
    </div>


}

export default Sidebar;