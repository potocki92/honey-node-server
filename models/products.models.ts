import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document{
  name: string;
  price: number;
  description?: string;
}

const productSchema: Schema = new Schema<IProduct>({
  name: {
    type: String,
    require: [true, "Nazwa produktu jest wymagana"],
    validate: {
      validator: (value: string) => {
        return value.length > 5
      },
      message: "Nazwa produktu musi mieć co najmniej 6 znakow"
    }
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: [true, "Cena produktu jest wymagana"],
    validate: {
      validator: (value: number) => {
        return value >= 0;
      },
      message: "Cena produktu nie może być ujemna",
    },
  },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
