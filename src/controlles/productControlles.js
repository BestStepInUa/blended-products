import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getAllProducts = async (req, res) => {
  const { _id: userId } = req.user;
  const {
    page = 1,
    perPage = 10,
    category,
    minPrice,
    maxPrice,
    sortBy = 'price',
    sortOrder = 'asc',
    search,
  } = req.query;
  const skip = (page - 1) * perPage;
  const productsQuery = Product.find();
  if (userId) {
    productsQuery.where('userId').equals(userId);
  }
  if (category) {
    productsQuery.where('category').equals(category);
  }
  if (minPrice) {
    productsQuery.where('price').gte(minPrice);
  }
  if (maxPrice) {
    productsQuery.where('price').lte(maxPrice);
  }
  if (search) {
    productsQuery.where({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ],
    });
  }
  if (sortBy && sortOrder) {
    productsQuery.sort({ [sortBy]: sortOrder });
  }

  const [totalProducts, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(perPage),
  ]);
  const totalPages = Math.ceil(totalProducts / perPage);
  res.status(200).json({ page, perPage, totalProducts, totalPages, products });
};

export const getProductById = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;
  const product = await Product.findById({ _id: productId, userId });
  if (!product) {
    return res.status(404).json({
      message: `Product by id${productId} not found`,
    });
  }
  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const product = await Product.create({ ...req.body, userId });
  res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;
  const product = await Product.findOneAndDelete({ _id: productId, userId });
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json(product);
};

export const updateProducts = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      userId,
    },
    req.body,
  );

  if (!product) {
    throw createHttpError(404, `Product with id=${productId} not found`);
  }
  res.status(200).json(product);
};
