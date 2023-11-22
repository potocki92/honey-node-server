import { Request, Response, NextFunction } from "express";
import { addProduct, getProducts } from "../service/products.service";
import { ProductRequest, ProductBody } from "../types/products.types";
import mongoose, { Error } from "mongoose";
import { productSchema } from "../utils/validation";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    console.log(products);

    return res.json({
      status: res.statusCode,
      data: {
        message: "All Products",
        products: products,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const createProduct = async (
  req: ProductRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;

    await productSchema.validateAsync(body, { abortEarly: false });
    const newProduct: ProductBody = await addProduct(
      body.name,
      body.price,
      body.description
    );

    res.status(201).json({
      status: 201,
      statusText: "Created",
      data: {
        product: newProduct,
      },
    });
  } catch (err: any) {
    handleValidationError(err, res, next);
  }
};
const handleValidationError = (
  err: Error,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const validationErrors: Record<string, string> = {};
    for (const field in err.errors) {
      if (err.errors.hasOwnProperty(field)) {
        validationErrors[field] = err.errors[field as keyof Error].message;
      }
    }
    console.log(validationErrors);

    res.status(400).json({
      message: "Mongoose validation failed",
      errors: validationErrors,
    });
  } else {
    console.error(err);
    next(err);
  }
};
