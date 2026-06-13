import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProducts,
} from '../controlles/productControlles.js';

import {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
  getAllProductsSchema,
} from '../validation/productsValidation.js';

const router = Router();

router.get('/products', celebrate(getAllProductsSchema), getAllProducts);
router.get('/products/:productId', celebrate(productIdSchema), getProductById);
router.post('/products', celebrate(createProductSchema), createProduct);
router.delete(
  '/products/:productId',
  celebrate(productIdSchema),
  deleteProduct,
);
router.patch(
  '/products/:productId',
  celebrate(updateProductSchema),
  updateProducts,
);

export default router;
