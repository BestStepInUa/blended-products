import { Schema, model } from 'mongoose';

import { CATEGORIES } from '../constants/category.js';
import { handleMongooseError, setUpdateOptions } from './hooks.js';

const productSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 5,
      maxLength: 30,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: CATEGORIES,
      default: 'other',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    description: {
      type: String,
      maxLength: 300,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

productSchema.post('save', handleMongooseError);
productSchema.pre('findOneAndUpdate', setUpdateOptions);
productSchema.post('findOneAndUpdate', handleMongooseError);

export const productSortFields = Object.keys(productSchema.paths);

export const Product = model('Product', productSchema);
