import { Document } from 'mongoose';

export interface Product extends Document {
  readonly _id?: string;
  readonly name: String;
  readonly description: String;
  readonly imageURL: String;
  readonly price: Number;
  readonly createdAt?: Date;
}