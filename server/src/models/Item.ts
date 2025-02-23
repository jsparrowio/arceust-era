import { Schema, type Document } from 'mongoose';

export interface ItemDocument extends Document {
  id: String;
  itemId: string;
  name: string;
  sprite: string;
  quantity: number;
}

const itemSchema = new Schema<ItemDocument>({
  name: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  sprite: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

export default itemSchema;
