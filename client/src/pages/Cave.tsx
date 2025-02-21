// import { getPokemon } from "../api/PokeAPI"
import { useEffect } from "react"
import { useState } from "react"
import '../assets/biome.css'
export const Cave = () => {
    const pokeArr = ["Zubat", "Golbat", "Geodude", "Graveler", "Gastly", "Dunsparce", "Cubone", "Deino"]
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
    const [isShiny, setShiny] = useState<boolean>(false)
    const [item, setItem] = useState<Record<string, any>>({})
    const [narration, setNarration] = useState<string>('')
    const [num, setNum] = useState<number>()
    const [clicked, setClicked] = useState<boolean>(false)


    useEffect(() => {
    }, [])

    // const shinyChance = () => {
        // const shinyChance = Math.random()
        // if (shinyChance > .80) {
        //     shiny = true
        // }
        // return shiny
    // }
    const roll = () => {
        setClicked(true)
        const chances = [1, 2, 3]
        const randomNum = chances[Math.floor(Math.random() * chances.length)]
        setNum(randomNum)
        console.log(randomNum)
        if (randomNum === 1) {
            setloading(true)
            getPokemon().then((pokemon) => {
                setPoke(pokemon); console.log(pokemon)
                const shinyChance = Math.random()
                if (shinyChance > .8) {
                    setShiny(true)
                } else {
                    setShiny(false)
                }
                console.log(isShiny)
            })
            setItem({})
        } else if (randomNum === 2) {
            getItem().then((item) => { setItem(item); console.log(item) })
            setPoke({})
        } else if (randomNum === 3) {
            setPoke({})
            setItem({})
        }
        //also get random item


        //also get random item
        setloading(false)

    }
    return (
        <div>
            {!clicked && <h1>You enter the cave.</h1>}
            {clicked && <h1>{narration}</h1>}
            <div className="biomediv">
                <img className="biomeimg" src='https://cdnb.artstation.com/p/assets/images/images/019/585/585/large/ritesh-pawar-caveaa.jpg?1564145923' />
                {!loading && poke && !isShiny && <img className='pokeimg' src={poke?.sprites?.front_default} alt={poke.name} />}
                {!loading && poke && isShiny && <img className='pokeimg' src={poke?.sprites?.front_shiny} alt={poke.name} />}
                {!loading && item && <img className='itemimg' src={item?.sprites?.default} alt={item.name} />}
                <button onClick={() => {roll()
                    let newNarration = ""
                    if (num === 1) {
                        newNarration = `A wild ${poke.name} appeared!`
                    } else if (num === 2) {
                        newNarration = `You found a(n) ${item.name}`
                    } else if (num === 3) {
                        newNarration = "Nothing appeared..."
                    }
                    setNarration(newNarration)
                }
                    
                }>Get Random Pokemon or Item or Nothing</button>
            </div>
        </div>
    )

}