import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import pokemonSchema from './Pokemon.js';
import itemSchema from './Item.js';
import type { PokemonDocument } from './Pokemon.js';
import type { ItemDocument } from './Item.js';

export interface UserDocument extends Document {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  team: PokemonDocument[];
  box: PokemonDocument[];
  inventory: ItemDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  teamCount: number;
  boxCount: number;
  inventoryCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    team: [pokemonSchema],
    box: [pokemonSchema],
    inventory: [itemSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual('teamCount').get(function () {
  return this.team.length;
});

userSchema.virtual('boxCount').get(function () {
  return this.box.length;
});

userSchema.virtual('inventoryCount').get(function () {
  return this.inventory.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;
