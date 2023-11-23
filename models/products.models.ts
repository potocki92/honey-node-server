import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
}

const productSchema: Schema = new Schema<IProduct>({
  name: {
    type: String,
    require: [true, "Nazwa produktu jest wymagana"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: [true, "Cena produktu jest wymagana"],
  },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
