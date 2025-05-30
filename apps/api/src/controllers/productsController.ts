import Product from "../models/Product";
import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};
