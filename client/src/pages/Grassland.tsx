// import { getPokemon } from "../api/PokeAPI"
import { useEffect } from "react"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { useMutation } from "@apollo/client"
import { CATCH_POKEMON, SAVE_ITEM } from "../utils/mutations"
import { QUERY_ME } from "../utils/queries"
import '../assets/biome.css'
export const Grassland = () => {
    const [catchPkmn, {error}] = useMutation(CATCH_POKEMON)
    const [saveItem, states] = useMutation(SAVE_ITEM)
    const {data, refetch} = useQuery(QUERY_ME)
    useEffect(() => {
      refetch()
    }, [data] )
  
    const pokeArr = ["Budew", "Turtwig", "Grotle", "Torterra", "Shaymin", "Gossifleur", "Smoliv", "Snivy", "Servine", "Serperior", "Kricketot", "Kricketune", "Pidgey", "Pidgeotto", "Pidgeot",]
    const itemArr = ["potion", "poke-ball"]
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
    // const [num, setNum] = useState<number>()
    const [clicked, setClicked] = useState<boolean>(false)


    useEffect(() => {
    }, [narration])

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
        // setNum(randomNum)
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
                setNarration(`A wild ${pokemon.name} appeared!`)

            })
            setItem({})
        } else if (randomNum === 2) {
            getItem().then((item) => { setItem(item); console.log(item); setNarration(`You found a(n) ${(item.name)}`) })
            setPoke({})
            // setNarration(`You found a(n) ${item.name}`)
        } else if (randomNum === 3) {
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
                variables: { input: {...storedPokemon } },
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
                variables: {input: {...itemInfo}}
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
            {!clicked && <h1>You enter the forest.</h1>}
            {clicked && <h1>{narration}</h1>}
            <div className="biomediv">
                <img className="biomeimg" src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb8431de-9631-4ad2-b8fc-667b063d7471/d6dkaxe-15a2de20-5e6a-4284-bf8d-cffd2827ee75.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZiODQzMWRlLTk2MzEtNGFkMi1iOGZjLTY2N2IwNjNkNzQ3MVwvZDZka2F4ZS0xNWEyZGUyMC01ZTZhLTQyODQtYmY4ZC1jZmZkMjgyN2VlNzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.6T6EQtyjY2BSdMFQyAjdplBJVn_VMBrV2nX8vlpVqnM' />
                {!loading && poke && !isShiny && <img className='wildpokeimg' src={poke?.sprites?.front_default} alt={poke.name} />}
                {!loading && poke && isShiny && <img className='wildpokeimg' src={poke?.sprites?.front_shiny} alt={poke.name} />}
                {!loading && data.Me && <img className='mypokemon' src={data.Me.team[0].back_sprite}/>}
                {!loading && item && <img className='itemimg' src={item?.sprites?.default} alt={item.name} />}
                <div className="btndiv">
                    <button className='acnbtn' onClick={() => {
                        roll()
                        // let newNarration = ""
                        // if (num === 1) {
                        //     newNarration = `A wild ${poke.name} appeared!`
                        // } else if (num === 2) {
                        //     newNarration = `You found a(n) ${item.name}`
                        // } else if (num === 3) {
                        //     newNarration = "Nothing appeared..."
                        // }
                        // setNarration(newNarration)
                    }
                    }>Continue!</button>
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
    )

}