// import { getPokemon } from "../api/PokeAPI"
import { useEffect } from "react"
import { useState } from "react"
import '../assets/biome.css'
export const Beach = () => {
    const [loading, setloading] = useState(true)
    const [poke, setPoke] = useState<Record<string, any>>({})
    const [isShiny, setShiny] = useState<boolean>(false)
    const [item, setItem] = useState<Record<string, any>>({})
    const [narration, setNarration] = useState<string>('')
    const [clicked, setClicked] = useState<boolean>(false)
    // FFR, call 'get' functions 'fetches' instead
    const getPokemon = async (id: any) => {
        if (id === 'walk') {
            try {
                const pokeArr = ["Krabby", "Kingler", "Sandygast", "Palossand", "Staryu", "Slowpoke", "Stunfisk", "Tirtouga"]
                const randomPokemon = pokeArr[Math.floor(Math.random() * pokeArr.length)]
                console.log(`Random pokemon: ${randomPokemon}`)
                const encounter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
                const response = encounter.json()
                console.log(response)
                return response
            } catch (err) {
                console.error("Pokemon not found!")
            }
        } else if (id === 'fish') {
            try {
                const pokeArr = ["Magikarp", "Gyarados", "Horsea", "Seadra", "Kingdra", "Dratini", "Dragonair", "Dhelmise"]
                const randomPokemon = pokeArr[Math.floor(Math.random() * pokeArr.length)]
                const encounter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
                const response = encounter.json()
                console.log(response)
                return response
            } catch (err) {
                console.error("Pokemon not found!")
            }
        }
    }


    const getItem = async (id: any) => {
        if (id === 'walk') {
            try {
                const itemArr = ["potion", "poke-ball"]
                const randomItem = itemArr[Math.floor(Math.random() * itemArr.length)]
                const find = await fetch(`https://pokeapi.co/api/v2/item/${randomItem}`)
                const response = find.json()
                console.log(response)
                return response
            } catch (err) {
                console.error("Item not found!")
            }
        } else if (id === 'fish') {
            try {
                const itemArr = ["expert-belt", "amulet-coin", "choice-band", "choice-scarf", "silk-scarf"]
                const randomItem = itemArr[Math.floor(Math.random() * itemArr.length)]
                const find = await fetch(`https://pokeapi.co/api/v2/item/${randomItem}`)
                const response = find.json()
                console.log(response)
                return response
            } catch (err) {
                console.error("Item not found!")
            }
        }
    }

    // const rollThree = () => {
    //     const chances = [1, 2, 3]
    //     const randomNum = chances[Math.floor(Math.random() * chances.length)]
    //     setRoll(randomNum)

    // }

    useEffect(() => {
    }, [narration])

    // const shinyChance = () => {
    // const shinyChance = Math.random()
    // if (shinyChance > .80) {
    //     shiny = true
    // }
    // return shiny
    // }
    // For future ref, call click functions handleclick
    const roll = (event: any) => {
        setClicked(true)
        const chances = [1, 2, 3]
        const randomNum = chances[Math.floor(Math.random() * chances.length)]
        // setNum(randomNum)
        console.log(randomNum)
        if (randomNum === 1) {
            setloading(true)
            getPokemon(event.target.id).then((pokemon) => {
                setPoke(pokemon); console.log(pokemon)
                const shinyChance = Math.random()
                if (shinyChance > .8) {
                    setShiny(true)
                } else {
                    setShiny(false)
                }
                console.log(isShiny)
                setNarration(`A wild ${pokemon.name} appeared!`)

            })
            setItem({})
        } else if (randomNum === 2) {
            getItem(event.target.id).then((item) => { setItem(item); console.log(item); setNarration(`You found a(n) ${item.name}`) })
            setPoke({})
            // setNarration(`You found a(n) ${item.name}`)
        } else if (randomNum === 3 && event.target.id === 'walk') {
            setPoke({})
            setItem({})
            setNarration("Nothing appeared...")
        } else if (randomNum === 3 && event.target.id === 'fish') {
            setItem({})
            setPoke({})
            setNarration('Nothing is biting...')
        }
        //also get random item


        //also get random item
        setloading(false)

    }
    const catchPkmn = async () => {
        const coinFlip = Math.random()
        if (coinFlip >= .5) {
            setNarration(`Congratulations! You caught the ${poke.name}!`)
            setPoke({})
        } else {
            setNarration(`Get some better pokeballs dweeb`)
        }
        // TODO: Set up graphql mutations to handle catching and storing pokemon in database
    }

    const grabItem = () => {
        setNarration(`You picked up the ${item.name}.`)
        setItem({})
        // TODO: Set up graphql mutations to handle adding items to inventory
    }
    return (
        <div>
            {!clicked && <h1>You went to the beach.</h1>}
            {clicked && <h1>{narration}</h1>}
            <div className="biomediv">
                <img className="biomeimg" src='https://st5.depositphotos.com/3584053/65993/i/450/depositphotos_659935466-stock-photo-sea-background-nature-tropical-summer.jpg' />
                {!loading && poke && !isShiny && <img className='pokeimg' src={poke?.sprites?.front_default} alt={poke.name} />}
                {!loading && poke && isShiny && <img className='pokeimg' src={poke?.sprites?.front_shiny} alt={poke.name} />}
                {!loading && item && <img className='itemimg' src={item?.sprites?.default} alt={item.name} />}
                <div className="btndiv">
                    <button id="walk" onClick={(event) => roll(event)
                    }>Walk</button>

                    <button id="fish" onClick={(event) => roll(event)
                    }>Fish</button> 

                    {clicked && poke.name && <button onClick={() => {
                        catchPkmn()
                    }}>Catch it!</button>}
                    {clicked && item.name && <button onClick={() => {
                        grabItem()
                    }}
                    >Pick up!</button>}
                </div>
            </div>
        </div>
    )

}