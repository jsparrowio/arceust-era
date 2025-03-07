import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { QUERY_ME } from "../utils/queries"
import Auth from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "antd";

// Function found at https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export const Bag = () => {
    const { loading, data, refetch } = useQuery(QUERY_ME);
    const [reloading, setReloading] = useState(true);
    const [inventory, setInventory] = useState([{ name: "loading...", sprite: "undefined" }]);
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const loggedIn = Auth.loggedIn();
        if (loggedIn === true) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            Auth.logout();
            navigate('/login');
        }
    }, [location]);


    useEffect(() => {
        setReloading(true);
        !loading ? setInventory(data?.Me?.inventory) : setInventory([{ name: "loading...", sprite: "undefined" }]);
        refetch();
    }, [data]);
    useEffect(() => {
        console.log(inventory);
        setInventory(data?.Me?.inventory);
        setReloading(false);
    }, [inventory]);

    return (
        <>
            {loggedIn &&
                <>
                    <div>
                        <h1>Bag</h1>
                    </div>
                    <div className='party-container'>
                        {!loading && inventory && reloading === false &&
                            <div className='bagdiv'>
                                {inventory.map((item: any) =>
                                    <div className='inventory-item' key={item.name}>
                                        <img src={item.sprite} />
                                        <p>{toTitleCase(item.name.replace("-", " "))}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </>
            }
            {!loggedIn &&
                <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>
                    <Card variant={"outlined"} style={{ width: 300 }}>
                        <p>
                            You must be logged in to view this page!
                            <br />
                            Redirecting...
                        </p>
                    </Card>
                </div>
            }
        </>
    )

}
