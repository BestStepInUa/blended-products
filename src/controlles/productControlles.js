import createHttpError from 'http-errors';
import { Product } from '../models/products.js';

export const getAllProducts = async (req, res) => {
  const { page, perPage, category, minPrice, maxPrice } = req.query;
  const skip = (page - 1) * perPage;
  const productsQuery = Product.find();
  if (category) {
    productsQuery.where('category').equals(category);
  }
  if (minPrice) {
    productsQuery.where('price').gte(minPrice);
  }
  if (maxPrice) {
    productsQuery.where('price').lte(maxPrice);
  }

  const [totalProducts, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalProducts / perPage);
  res.status(200).json({ page, perPage, totalProducts, totalPages, products });
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      message: `Product by${productId} not find`,
    });
  }
  res.status(200).json(product);
};
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndDelete({ _id: productId });
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json(product);
};
export const updateProducts = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
    },
    req.body,
    { returnDocument: 'after' },
  );

  if (!product) {
    throw createHttpError(404, `Product with id=${productId} not found`);
  }
  res.status(200).json(product);
};
