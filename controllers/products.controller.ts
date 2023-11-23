import { Response, NextFunction, Request } from "express";
import {
  addProduct,
  deleteProductById,
  getProductById,
  getProducts,
} from "../service/products.service";
import { ProductRequest, ProductBody } from "../types/products.types";
import { productValidation } from "../utils/validation";
import { handleProductNotFound, handleValidationError } from "../utils/error";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    await productValidation.validateAsync(body, { abortEarly: false });
    const newProduct: ProductBody = await addProduct(
      body.name,
      body.price,
      body.description
    );

    res.status(201).json({
      statusText: "Created",
      data: {
        product: newProduct,
      },
    });
  } catch (err: any) {
    handleValidationError(err, res, next);
  }
};

export const findProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (handleProductNotFound(res, id, product)) {
      return;
    }
    console.log(product);
    res.status(200).json({
      data: {
        product,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await deleteProductById(id);
    if (handleProductNotFound(res, id, product)) {
      return;
    }
    res.status(200).json({ message: "Produkt został prawidłowo usunięty" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
