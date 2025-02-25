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
            <div className='pkctrmenudiv'>
                <h1>Pokecenter</h1>
                    <button onClick={() => {
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
            <div className='biomediv'>
                <div className='boxdiv'>
                    {!loading && showBox && data.Me.box.map((pokemon: any) =>
                        <div className='boxpkmn'>
                            <img src={pokemon.front_sprite} />
                            <p>{pokemon.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}