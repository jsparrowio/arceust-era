// import { getPokemon } from "../api/PokeAPI"
import { useEffect } from "react"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { useMutation } from "@apollo/client"
import { CATCH_POKEMON, SAVE_ITEM } from "../utils/mutations"
import { QUERY_ME } from "../utils/queries"
import '../assets/biome.css'
export const Beach = () => {
    const [catchPkmn, { error }] = useMutation(CATCH_POKEMON)
    const [saveItem, states] = useMutation(SAVE_ITEM)
    const { data, refetch } = useQuery(QUERY_ME)
    useEffect(() => {
        refetch()
    }, [data])

    const [loading, setloading] = useState(true)
    const [poke, setPoke] = useState<Record<string, any>>({})
    const [isShiny, setShiny] = useState<boolean>(false)
    const [item, setItem] = useState<Record<string, any>>({})
    const [narration, setNarration] = useState<string>('')
    const [clicked, setClicked] = useState<boolean>(false)
    const [setting, setSetting] = useState('beach')
    // FFR, call 'get' functions 'fetches' instead
    const getPokemon = async (id: any) => {
        if (id === 'walk') {
            try {
                const pokeArr = ["Krabby", "Kingler", "Sandygast", "Palossand", "Staryu", "Slowpoke", "Stunfisk", "Tirtouga", "Carracosta", "Pyukumuku", "Wimpod", "Golisopod", "Gimmighoul", "Wigglet", "Wugtrio"]
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
                const pokeArr = ["Magikarp", "Gyarados", "Horsea", "Seadra", "Kingdra", "Dratini", "Dragonair", "Dhelmise", "Mareanie", "Toxapex", "Feebas", "Milotic", "Goldeen", "Seaking", "Tentacool", "Tentacruel", "Chinchou", "Lanturn", "Kabuto", "Kabutops", "Bruxish", "Veluza", "Luvdisc", "Remoraid", "Octillery", "Clamperl", "Huntail", "Gorebyss"]
                const randomPokemon = pokeArr[Math.floor(Math.random() * pokeArr.length)]
                const encounter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
                const response = encounter.json()
                console.log(response)
                return response
            } catch (err) {
                console.error("Pokemon not found!")
            }
        } else if (id === 'surf') {
            try {
                const pokeArr = ["Basculin", "Basculegion", "Frillish", "Jellicent", "Froakie", "Frogadier", "Greninja", "Piplup", "Prinplup", "Empoleon", "Seel", "Dewgong", "Lapras", "Vaporeon", "Tentacool", "Tentacruel", "Mantyke", "Mantine", "Wailmer", "Wailord"]
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
                const itemArr = ["potion", "poke-ball", "heart-scale", "soft-sand", "shell-bell"]
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
        } else if (id === 'surf') {
            try {
                const itemArr = ["float-stone", "water-gem"]
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
    }, [setting, narration])

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
        } else if (randomNum === 3 && event.target.id === 'walk' || event.target.id === 'surf' || event.target.id === 'fish') {
            setPoke({})
            setItem({})
            setNarration("Nothing appeared...")
        }
        //also get random item


        //also get random item
        setloading(false)

    }
    const handleCatchPokemon = async () => {
        const coinFlip = Math.random()
        if (coinFlip >= .5) {
            setNarration(`Congratulations! You caught the ${poke.name}!`)
            setPoke({})
        } else {
            setNarration(`Get some better pokeballs dweeb`)
        }
        // TODO: Set up graphql mutations to handle catching and storing pokemon in database
        let storedPokemon;
        if (isShiny) {
            storedPokemon = {
                name: poke.name,
                pokemonId: poke.id,
                front_sprite: poke.sprites.front_shiny,
                back_sprite: poke.sprites.back_shiny
            }
        } else {
            storedPokemon = {
                name: poke.name,
                pokemonId: poke.id,
                front_sprite: poke.sprites.front_default,
                back_sprite: poke.sprites.back_default
            }
        }
        try {
            await catchPkmn({
                variables: { input: { ...storedPokemon } },
            });
            if (error) {
                throw new Error(`Couldn't catch pokemon!`)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const grabItem = async () => {
        setNarration(`You picked up the ${item.name}.`)
        setItem({})
        // TODO: Set up graphql mutations to handle adding items to inventory
        try {
            const itemInfo = {
                name: item.name,
                itemId: item.id,
                sprite: item.sprites.default
            }

            await saveItem({
                variables: { input: { ...itemInfo } }
            })
            if (states.error) {
                throw new Error('Nice try butterfingers')
            }

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            {!clicked && <h1>You went to the beach.</h1>}
            {clicked && <h1>{narration}</h1>}
            <div className="biomediv">
                {setting === 'beach' && <img className="biomeimg" src='https://st5.depositphotos.com/3584053/65993/i/450/depositphotos_659935466-stock-photo-sea-background-nature-tropical-summer.jpg' />}
                {setting === 'ocean' && <img className="biomeimg" src='https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />}
                {!loading && poke && !isShiny && <img className='wildpokeimg' src={poke?.sprites?.front_default} alt={poke.name} />}
                {!loading && poke && isShiny && <img className='wildpokeimg' src={poke?.sprites?.front_shiny} alt={poke.name} />}
                {!loading && data.Me && <img className='mypokemon' src={data?.Me?.team[0]?.back_sprite} />}
                {!loading && item && <img className='itemimg' src={item?.sprites?.default} alt={item.name} />}
                <div className="btndiv">
                    <div className='priacndiv'>
                        <button className='acnbtn' id="walk" onClick={(event) => {
                            roll(event)
                            setSetting('beach')
                        }
                        }>Walk</button>

                        <button className='acnbtn' id="fish" onClick={(event) => roll(event)
                        }>Fish</button>

                        <button className='acnbtn' id="surf" onClick={(event) => {
                            roll(event)
                            setSetting('ocean')
                        }
                        }>Surf</button>
                    </div>
                    <div className='secacndiv'>
                        {clicked && poke.name && <button className='acnbtn' onClick={() => {
                            handleCatchPokemon()
                        }}>Catch it!</button>}
                        {clicked && item.name && <button className='acnbtn' onClick={() => {
                            grabItem()
                        }}
                        >Pick up!</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}