import { useState } from "react"
import { useEffect } from "react"
import { useQuery } from "@apollo/client/react/hooks/useQuery"
import { QUERY_ME } from "../utils/queries"

export const Pokecenter = () => {
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
    )

}