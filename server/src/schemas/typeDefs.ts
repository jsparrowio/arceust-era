// set up type definitions for GraphQL/Apollo
// also sets up input types, queries, and mutations, which allow for the modification of data in the database
const gql = String.raw
const typeDefs = gql`
type User {
    _id: ID
    username: String
    first_name: String
    last_name: String
    email: String
    password: String
    team: [Pokemon]!
    box: [Pokemon]!
    inventory: [Item]!
    teamCount: Int
    boxCount: Int
    inventoryCount: Int
}

input UserInput {
    username: String!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
}

input UserProfile {
    username: String!
    first_name: String!
    last_name: String!
    email: String!
}

type Pokemon {
    _id: ID
    name: String
    pokemonId: Int
    front_sprite: String
    back_sprite: String
}

input PokemonInput {
    name: String!
    pokemonId: String!
    front_sprite: String!
    back_sprite: String!
}

type Item {
    _id: ID
    name: String
    itemId: String
    sprite: String
    quantity: Int
}

input ItemInput {
    name: String!
    itemId: String!
    sprite: String!
}

type Auth {
    token: ID!
    user: User!
}

type Query {
    Me: User
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    updateProfile(input: UserProfile!): User
    updatePassword(password: String!): String
    confirmPassword(currentPassword: String!): Boolean
    deleteUser(_id: ID!): String
    catchPokemon(input: PokemonInput!): User
    releasePokemon(_id: ID!): User
    resetBox(_id: ID!): User
    addToTeam(input: PokemonInput!, _id: ID!): User
    removeFromTeam(input: PokemonInput!, _id: ID!): User
    resetTeam(_id: ID!): User
    saveItem(input: ItemInput!): User
    useItem(itemId: String!): User
    removeOneOfItem(itemId: String!): User
    removeAllOfItem(itemId: String!): User
    resetInventory(_id: ID!): User
}
`;

// export typeDefs to be used elsewhere
export default typeDefs;