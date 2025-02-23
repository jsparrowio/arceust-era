import { Schema, type Document } from 'mongoose';

export interface PokemonDocument extends Document {
  id: String;
  pokemonId: string;
  name: string;
  front_sprite: string;
  back_sprite: string;
}

const pokemonSchema = new Schema<PokemonDocument>({
  name: {
    type: String,
    required: true,
  },
  pokemonId: {
    type: String,
    required: true,
  },
  front_sprite: {
    type: String,
    required: true,
  },
  back_sprite: {
    type: String,
    required: true,
  }
});

export default pokemonSchema;
