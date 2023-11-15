import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { addProduct, getProducts } from "../service/products.service";
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    console.log(products);

    return res.json({
      status: res.statusCode,
      message: "All Products",
      products: products,
    });
  } catch (err) {
    console.error(err);
  }
};

interface ProductBody {
  name: string;
  price: number;
  description: string;
}

interface ProductRequest extends Request {
  body: ProductBody;
}
export const createProduct = async (
  req: ProductRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, description } = req.body;
    const schema: Joi.ObjectSchema<any> = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
    });

    const { error } = schema.validate({ name, price, description });

    if (error) {
      res.status(400).json({
        message: `Missing required fields: ${error.details[0].context?.key}`,
      });
      return;
    }

    const newProduct: ProductBody = await addProduct(name, price, description);

    console.log(newProduct);

    res.status(201).json({
      message: "Successfully created a new product.",
      product: newProduct,
    });
    console.table(newProduct);
  } catch (err) {
    next(err);
  }
};
