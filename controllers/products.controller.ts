import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    return res.json({
      status: res.statusCode,
      message: "All Products",
    });
  } catch (err) {
    console.error(err);
  }
};
