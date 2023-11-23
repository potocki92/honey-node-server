import express from "express";
import {
  createProduct,
  deleteProduct,
  findProduct,
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
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by id
 *     description: Retrieve product from the database
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           example: 65553668b5ebc4bd2fce49e7
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
router.get("/:id", findProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to delete.
 *         required: true
 *         schema:
 *           type: string
 *           example: 65553668b5ebc4bd2fce49e7
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Transaction deleted successfully
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Transaction not found
 *       500:
 *         description: Server Error
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
 *                   example: Server error
 */
router.delete("/:id", deleteProduct);
export { router as productRouter };
