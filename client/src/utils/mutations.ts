// import graphQL from Apollo to set up mutations to be used elsewhere
// mutations match server side mutations
import { gql } from '@apollo/client';

// user login mutation
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// mutation to create a new user
export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const UPDATE_PROFILE = gql`
mutation UpdateProfile($input: UserProfile!) {
updateProfile(input: $input) {
    username
    first_name
    last_name
    email
  }
}
`

export const CONFIRM_PASSWORD = gql`
mutation ConfirmPassword($currentPassword: String!) {
  confirmPassword(currentPassword: $currentPassword)
}
`

export const UPDATE_PASSWORD = gql`
mutation UpdatePassword($password: String!) {
  updatePassword(password: $password)
}
`

export const DELETE_USER = gql`
mutation DeleteUser($id: ID!) {
  deleteUser(_id: $id)
}
`
export const RESET_BOX = gql`
mutation ResetBox($id: ID!) {
  resetBox(_id: $id) {
    boxCount
  }
}
`

export const RESET_TEAM = gql`
mutation ResetTeam($id: ID!) {
  resetTeam(_id: $id) {
    teamCount
  }
}
`

export const RESET_INVENTORY = gql`
mutation ResetInventory($id: ID!) {
  resetInventory(_id: $id) {
    inventoryCount
  }
}
`

export const SAVE_ITEM = gql`
mutation SaveItem($input: ItemInput!) {
  saveItem(input: $input) {
    inventoryCount
  }
}`

export const USE_ITEM = gql`
mutation UseItem($itemId: String!) {
  useItem(itemId: $itemId) {
    inventory
  }
}
`

export const CATCH_POKEMON = gql`
mutation CatchPokemon($input: PokemonInput!) {
  catchPokemon(input: $input) {
    teamCount
  }
}
`

export const RELEASE_POKEMON = gql`
mutation ReleasePokemon($id: ID!) {
  releasePokemon(_id: $id) {
    boxCount
  }
}
`