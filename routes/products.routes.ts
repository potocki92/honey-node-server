import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/products.controller";

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products from the database
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/", getAllProducts);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product with the provided details.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: body
 *         name: products
 *         description: Product to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Miód Rzepakowy"
 *             price:
 *               type: number
 *               example: 45.00
 *             description:
 *               type: string
 *               example: "Smaczny miód rzepakowy"
 *     responses:
 *       201:
 *         description: Successfully created a new product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductBody'
 *       400:
 *         description: Bad Request - Missing required fields.
 *         content:
 *           application/json:
 *             example:
 *               message: "Missing required fields: name"
 */
router.post("/", createProduct);
export { router as productRouter };
