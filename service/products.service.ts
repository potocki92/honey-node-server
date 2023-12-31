import { Product } from "../models/products.models";
import { ProductBody } from "../types/products.types";

export const addProduct = async (
  name: string,
  price: number,
  description?: string
): Promise<ProductBody> => {
  const newProduct = await Product.create({
    name,
    price,
    description,
  });

  return {
    name: newProduct.name,
    price: newProduct.price,
    description: newProduct.description,
  };
};

export const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteProductById = async (productId: string) => {
  try {
    return await Product.findByIdAndDelete(productId);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProductById = async (productId: string) => {
  try {
    return await Product.findById(productId);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
