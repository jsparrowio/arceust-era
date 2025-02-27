import { Schema, type Document } from 'mongoose';

export interface PokemonDocument extends Document {
  id: string;
  pokemonId: number;
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
    type: Number,
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
