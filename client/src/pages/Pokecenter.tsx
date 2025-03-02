import { useState } from "react"
import { useEffect } from "react"
import { useQuery } from "@apollo/client/react/hooks/useQuery"
import { QUERY_ME } from "../utils/queries"
import { RELEASE_POKEMON } from "../utils/mutations"
import { ADD_TO_TEAM } from "../utils/mutations"
import { REMOVE_FROM_TEAM } from "../utils/mutations"
import Auth from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "antd";
import { useMutation } from "@apollo/client";
// import '../assets/biome.css'
import '../assets/pokecenter.css'

export const Pokecenter = () => {
    const [selectedBoxSpot, setSelectedBoxSpot] = useState<number | null>(null);
    const [selectedPartySpot, setSelectedPartySpot] = useState<number | null>(null)
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
    const [release, {error}] = useMutation(RELEASE_POKEMON)
    const [addToTeam] = useMutation(ADD_TO_TEAM)
    const [removeFromTeam] = useMutation(REMOVE_FROM_TEAM)
    useEffect(() => {
        refetch() //useEffect to refetch user data
        // console.log(data.Me.team)
    }, [data])

    useEffect(() => {
        console.log(selectedBoxSpot)
    }, [selectedBoxSpot])
    // const changeParty = () => {
    
    const releasePokemon = async () => {
        try {
            console.log(data.Me.box[selectedBoxSpot!]._id)
            await release({
                variables: { id: data.Me.box[selectedBoxSpot!]._id }
            })
            console.log('Pokemon released!')
            refetch()
        } catch (err) {
            console.log(error)
            console.log(err)
            throw new Error('Could not release pokemon!')
        }
    }

    const swapTeam = async () => {
        try {
            await addToTeam({
                variables: { input: data.Me.box[selectedBoxSpot!], _id: data.Me.box[selectedBoxSpot!]._id}
            })

            await removeFromTeam({
                variables: { input: data.Me.team[selectedPartySpot!], _id: data.Me.team[selectedPartySpot!]._id}
            })
        } catch (err) {
            console.log(err)
        }
    }
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
                                setSelectedBoxSpot(null)
                                toggleBtnText('Show Box')
                            } else {
                                setShowBox(true)
                                toggleBtnText('Hide Box')
                            }
                        }
                        }>{btntext}</button>
                        {selectedBoxSpot !== null && <button onClick={() => {
                            releasePokemon()
                        }}>Release</button>}
                        {selectedPartySpot !== null && selectedBoxSpot !== null && <button onClick={() => {
                            swapTeam()
                        }}>
                            </button>}
                    </div>
                    <div className='partyandbox'>
                        <div className='party'>
                            {!loading && data.Me.team.map((pokemon: any, index: number) => 
                                <div className='partyslot'>
                                    <div onClick={() => setSelectedPartySpot(index)}
                                        className={selectedPartySpot === index ? 'partyslot selected' : 'partyslot'} >
                                        <img src={pokemon.front_sprite} />
                                        <p className='partypkmnname'>{pokemon.name}</p>
                                        {/* <p>{index}</p> */}
                                    </div>
                                </div>
                            )
                            }
                        </div>
                        <div className='box'>
                            {!loading && showBox && data.Me.box.map((pokemon: any, index: number) =>
                                <div className="boxslot">
                                    <div onClick={() => setSelectedBoxSpot(index)}
                                        className={selectedBoxSpot === index ? 'boxslot selected' : 'boxslot'} >
                                        <img src={pokemon.front_sprite} />
                                        <p className='boxpkmnname'>{pokemon.name}</p>
                                        {/* <p>{index}</p> */}
                                    </div>
                                </div>
                            )}
                        </div>
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
};