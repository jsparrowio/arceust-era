// import { getPokemon } from "../api/PokeAPI"
import { useEffect } from "react"
import { useState } from "react"

export const Cave = () => {
    const pokeArr = ["Turtwig", "Chimchar", "Piplup"]
    const itemArr = ["potion", "poke-ball"]
    const randomItem = itemArr[Math.floor(Math.random() * itemArr.length)]
    const getPokemon = async () => {
        try {
            const randomPokemon = pokeArr[Math.floor(Math.random() * pokeArr.length)]
            const encounter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
            const response = encounter.json()
            console.log(response)
            return response
        } catch (err) {
            console.error("Pokemon not found!")
        }
    }

    const getItem = async () => {
        try {
            const randomItem = itemArr[Math.floor(Math.random() * itemArr.length)]
            const find = await fetch(`https://pokeapi.co/api/v2/item/${randomItem}`)
            const response = find.json()
            console.log(response)
            return response
        } catch (err) {
            console.error("Pokemon not found!")
        }
    }
    
    // const rollThree = () => {
    //     const chances = [1, 2, 3]
    //     const randomNum = chances[Math.floor(Math.random() * chances.length)]
    //     setRoll(randomNum)
        
    // }
    const [loading, setloading] = useState(true)
    const [poke, setPoke] = useState<Record<string, any>>({})
    // const [roll, setRoll] = useState(0)
    const [item, setItem] = useState<Record<string, any>>({})
    useEffect(() => {
            // setloading(true)
            // getPokemon().then((pokemon) => {setPoke(pokemon); console.log(pokemon)})
            // setloading(false)
    }, [])

    const onClick = () => {
        const chances = [1, 2, 3]
        const randomNum = chances[Math.floor(Math.random() * chances.length)]
        console.log(randomNum)
            if (randomNum === 1) {
                setloading(true)
                getPokemon().then((pokemon) => {setPoke(pokemon); console.log(pokemon)})
            } else if (randomNum === 2) {
                getItem().then((item) => {setItem(item); console.log(item)})
            }
            //also get random item
            
            
            //also get random item
            
            setloading(false)
    }
    return (
        <div>
            <h1 id="narrator">You went to the cave.</h1>
                {!loading && poke && <img src={poke?.sprites?.front_default} alt={poke.name}/>}
                {!loading && item && <img src={item?.sprites?.default} alt={item.name}/>}

            <img src='https://cdnb.artstation.com/p/assets/images/images/019/585/585/large/ritesh-pawar-caveaa.jpg?1564145923'>
            </img>
            <button onClick={() => onClick()}>Get Random Pokemon or Item or Nothing</button>
        </div>
    )

}