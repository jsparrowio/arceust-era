import { useState } from "react"
import { useEffect } from "react"
import { useQuery } from "@apollo/client/react/hooks/useQuery"
import { QUERY_ME } from "../utils/queries"
import Auth from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "antd";

export const Pokecenter = () => {
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

    const [showBox, setShowBox] = useState<boolean>(false)
    const [btntext, toggleBtnText] = useState<string>('Show Box')
    const { loading, data, refetch } = useQuery(QUERY_ME)
    useEffect(() => {
        refetch()
    }, [data])

    // const changeParty = () => {

    // }
    return (
        <>
            {loggedIn &&
                <>
                    <div className='menudiv'>
                        <h1>Pokecenter</h1>
                        <button className='boxbtn' onClick={() => {
                            if (showBox) {
                                setShowBox(false)
                                toggleBtnText('Show Box')
                            } else {
                                setShowBox(true)
                                toggleBtnText('Hide Box')
                            }
                        }
                        }>{btntext}</button>
                    </div>
                    <div className='boxdiv'>
                        {!loading && showBox && data.Me.box.map((pokemon: any) =>
                            <div className='boxpkmn'>
                                <img src={pokemon.front_sprite} />
                                <p className='boxpkmnname'>{pokemon.name}</p>
                            </div>
                        )}
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
