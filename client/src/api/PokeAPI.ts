//TODO: Create function to get pokemon from API depending on area

const pokeArr = ["Turtwig", "Chimchar", "Piplup"]
const randomPokemon =  pokeArr[Math.floor(Math.random() * pokeArr.length)]
export const getPokemon = async (pokemon: string) => {
    try {
        const encounter = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const response = encounter.json()
        console.log(response)
        return response
    } catch (err) {
        console.error("Pokemon not found!")
    }
}


console.log(getPokemon(randomPokemon))
// const displayPokemon = async() => {

// }