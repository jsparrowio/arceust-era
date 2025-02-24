// import graphQL from Apollo to set up quieries to be used elsewhere
// queries match server side mutations
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
   Me {
    _id
    first_name
    email
    last_name
    username
    box {
      name
      pokemonId
      front_sprite
      back_sprite
      _id
    }
    inventory {
      itemId
      name
      sprite
      _id
      quantity
    }
    team {
      back_sprite
      front_sprite
      name
      pokemonId
      _id
    }
    boxCount
    teamCount
    inventoryCount
  }
  }
`;
