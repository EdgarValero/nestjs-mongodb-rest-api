import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: String;
  readonly description: String;
  readonly imageURL: String;
  readonly price: Number;
  readonly createAt: Date;
}