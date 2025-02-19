// set up type definitions for GraphQL/Apollo
// also sets up input types, queries, and mutations, which allow for the modification of data in the database
const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
}

input UserInput {
    username: String!
    email: String!
    password: String!
}

type Auth {
    token: ID!
    user: User!
}

type Query {
    Me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
}
`;

// export typeDefs to be used elsewhere
export default typeDefs;