import { Schema, model } from 'mongoose';

import { CATEGORIES } from '../constants/category.js';

const productShema = new Schema(
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

export const Product = model('Product', productShema);
