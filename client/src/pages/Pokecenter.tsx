import { useState } from "react"
import { useEffect } from "react"
import { useQuery } from "@apollo/client/react/hooks/useQuery"
import { QUERY_ME } from "../utils/queries"
import { RELEASE_POKEMON } from "../utils/mutations"
import { REMOVE_FROM_TEAM } from "../utils/mutations"
// import { UPDATE_TEAM } from "../utils/mutations"
import { ADD_TO_TEAM } from "../utils/mutations"
import Auth from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "antd";
import { useMutation } from "@apollo/client";

// import '../assets/biome.css'
import '../assets/pokecenter.css'

// Function found at https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

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
    const [release, { error }] = useMutation(RELEASE_POKEMON)
    // const [updateTeam] = useMutation(UPDATE_TEAM)
    const [removeFromTeam] = useMutation(REMOVE_FROM_TEAM)
    const [addToTeam] = useMutation(ADD_TO_TEAM)
    useEffect(() => {
        refetch() //useEffect to refetch user data
        // console.log(data.Me.team)
    }, [data])

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

    const emptyTeamSlots = () => {
        const slots = []
        for (let i = 0; i < 6 - data.Me.team.length; i++) {
            console.log('Generating empty party slot')
            const slot = (
                <div className='partyslot'>
                </div>
            )
            slots.push(slot)
        }
        return slots
    }

    const emptyBoxSlots = () => {
        const slots = []
        for (let i = 0; i < 30 - data.Me.box.length || i < 0; i++) {
            console.log('Generating empty box slot')
            const slot = (
                <div className="boxslot">
                </div>
            )
            slots.push(slot)
        }
        return slots
    }
    const removePkmn = async () => {
        try {
            await removeFromTeam({
                variables: { id: data.Me.team[selectedPartySpot!]._id }
            })

            // await addToTeam({
            //     variables: {_id: data.Me.team[selectedBoxSpot!]._id}
            // })
            // await updateTeam({
            //     variables: {_id: data.Me.box[selectedBoxSpot!]._id}
            // })
            refetch()
        } catch (err) {
            console.log(err)
        }
    }

    const addPkmn = async () => {
        try {
            // await removeFromTeam({
            //     variables: {id: data.Me.team[selectedPartySpot!]._id}
            // })

            await addToTeam({
                variables: { _id: data.Me.box[selectedBoxSpot!]._id }
            })
            // await updateTeam({
            //     variables: {_id: data.Me.box[selectedBoxSpot!]._id}
            // })
            refetch()
        } catch (err) {
            console.log(err)
        }
    }
    // }
    return (
        <>
            {loggedIn &&
                <>
                    <div><h1>Pokecenter</h1></div>
                    <div className='partyandbox'>
                        <div className="party-container">
                            <h2>My Party</h2>
                            <div className='party'>
                                {!loading && data.Me.team.map((pokemon: any, index: number) =>
                                    <div className='partyslot'>
                                        <div onClick={() => setSelectedPartySpot(index)}
                                            className={selectedPartySpot === index ? 'partyslot selected' : 'partyslot'} >
                                            <img className='partypkmn' src={pokemon.front_sprite} />
                                            <p className='partypkmnname'>{toTitleCase(pokemon.name)}</p>
                                            {/* <p>{index}</p> */}
                                        </div>
                                    </div>
                                )
                                }
                                {data?.Me?.team?.length < 6 && emptyTeamSlots()}
                            </div>
                        </div>
                        <div className='menudiv'>
                            <div className='btndiv'>
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
                                {selectedPartySpot !== null && <button className='boxbtn' onClick={() => {
                                    removePkmn()
                                }}
                                >Add to Box</button>}
                                {selectedBoxSpot !== null && data?.Me?.team?.length < 6 && <button className='boxbtn' onClick={() => {
                                    addPkmn()
                                }}
                                >Add To Team</button>
                                }
                                {selectedBoxSpot !== null && <button className='boxbtn' onClick={() => {
                                    releasePokemon()
                                }}
                                >Release</button>
                                }
                            </div>
                        </div>
                        {showBox &&
                            <div className="party-container">
                                <h2>My Box</h2>
                                <div className='box'>
                                    {!loading && data.Me.box.map((pokemon: any, index: number) =>
                                        <div className="boxslot">
                                            <div onClick={() => setSelectedBoxSpot(index)}
                                                className={selectedBoxSpot === index ? 'boxslot selected' : 'boxslot'} >
                                                <img src={pokemon.front_sprite} />
                                                <p className='boxpkmnname'>{toTitleCase(pokemon.name)}</p>
                                                {/* <p>{index}</p> */}
                                            </div>
                                        </div>
                                    )}
                                    {!loading && data?.Me?.team?.length < 30 && emptyBoxSlots()}
                                </div>
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
};