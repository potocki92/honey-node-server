import { NextFunction, Response } from "express";
import { Error } from "mongoose";

export const handleValidationError = (
  err: Error,
  res: Response,
  next: NextFunction
) => {
  if (err.name !== "ValidationError") {
    console.error(err.message);
    return next(err);
  }

  res.status(400).json({
    status: 400,
    data: { message: err.message },
  });
};

export const handleProductNotFound = (
  res: Response,
  id: string,
  product: unknown
) => {
  if (!product) {
    console.error(`Produkt o id ${id} nie został znaleziony.`);
    res.status(404).json({
      status: 404,
      data: {
        message: `Produkt o id ${id} nie został znaleziony.`,
      },
    });
    return true;
  }
  return false;
};
