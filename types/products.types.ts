import { Request } from "express";

export type ProductBody = {
  name: string;
  price: number;
  description?: string;
};

export type ProductRequest = Request<{}, {}, ProductBody> & { body: ProductBody };

