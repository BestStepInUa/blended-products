import dns from 'dns';
import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import 'dotenv/config';

dns.setServers(['1.1.1.1', '8.8.8.8']);

import { connectMongoDB } from '../db/connectMongoDB.js';
import { Product } from '../models/product.js';

const USER_ID = '6a2d9287451377db5dabe869';

const main = async () => {
  await connectMongoDB();

  const filePath = path.resolve('./src/products.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  const products = JSON.parse(fileContent);

  console.log('Products in file:', products.length);

  const data = products.map((product) => ({
    ...product,
    userId: USER_ID,
  }));

  const result = await Product.insertMany(data);

  console.log(`Inserted products: ${result.length}`);

  await mongoose.disconnect();
};

main().catch(async (error) => {
  console.error('Import failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
