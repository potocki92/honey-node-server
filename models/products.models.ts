import mongoose, { Schema, Document } from "mongoose";

interface Product extends Document{
  name: string;
  price: number;
  description: string;
}

const productSchema: Schema = new Schema<Product>({
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

export const Product = mongoose.model("Product", productSchema);
