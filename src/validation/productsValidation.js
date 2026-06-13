import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { CATEGORIES } from '../constants/category.js';

import { productSortFields } from '../models/product.js';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value)
    ? value
    : helpers.message('Product ID is invalid');
};

export const productIdSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required().messages({
      'string.base': 'Product ID must be a string',
      'string.required': 'Product ID is required',
      'any.custom': 'Product ID is invalid',
    }),
  }),
};

export const getAllProductsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    category: Joi.string().valid(...CATEGORIES),
    minPrice: Joi.number().positive(),
    maxPrice: Joi.number().positive(),
    sortBy: Joi.string()
      .valid(...productSortFields)
      .default('price'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    search: Joi.string().allow(''),
  }),
};

export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(30).required().messages({
      'string.base': 'Product name must be a string',
      'string.required': 'Product name is required',
      'string.min': 'Product name must be at least 5 characters long',
      'string.max': 'Product name must be at most 30 characters long',
    }),
    description: Joi.string().max(300).messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description must be at most 300 characters long',
    }),
    price: Joi.number().positive().required().messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
      'any.required': 'Price is required',
    }),
    category: Joi.string()
      .valid(...CATEGORIES)
      .messages({
        'string.base': 'Category must be a string',
        'string.valid': 'Invalid category',
      }),
  }),
};

export const updateProductSchema = {
  ...productIdSchema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(30).messages({
      'string.base': 'Product name must be a string',
      'string.min': 'Product name must be at least 5 characters long',
      'string.max': 'Product name must be at most 30 characters long',
    }),
    description: Joi.string().max(300).messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description must be at most 300 characters long',
    }),
    price: Joi.number().positive().messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be a positive number',
    }),
    category: Joi.string()
      .valid(...CATEGORIES)
      .messages({
        'string.base': 'Category must be a string',
        'string.valid': 'Invalid category',
      })

      .min(1)
      .messages({
        'object.min': 'At least one field must be provided for update',
      }),
  }),
};
