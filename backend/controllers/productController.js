import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/ErrorHandler.js";
import productModel from "../models/product.js";

// create product
const createProduct = asyncHandler(async (req, res, next) => {
  const { productName, description, quantity, price } = req.body;

  try {
    const product = await productModel({
      productName,
      description,
      quantity,
      price,
    });
    res.status(200).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET ALL PRODUCT
const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      message: "Products Fetch Successfully!",
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error));
  }
});

// GET QUERY PRODUCT
const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById({ id });
    res.status(200).json({
      success: true,
      message: "Product Found",
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error));
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  res.send("Update Product");
});

const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete product");
});

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
