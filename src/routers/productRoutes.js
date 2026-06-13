import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';

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

const productRouter = Router();

productRouter.use('/products', authenticate);

productRouter.get('/products', celebrate(getAllProductsSchema), getAllProducts);
productRouter.get(
  '/products/:productId',
  celebrate(productIdSchema),
  getProductById,
);
productRouter.post('/products', celebrate(createProductSchema), createProduct);
productRouter.delete(
  '/products/:productId',
  celebrate(productIdSchema),
  deleteProduct,
);
productRouter.patch(
  '/products/:productId',
  celebrate(updateProductSchema),
  updateProducts,
);

export default productRouter;
