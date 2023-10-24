import asyncHandler from "express-async-handler";
// import ErrorHandler from "../utils/ErrorHandler.js";
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
    console.log(error);
    // return next(new ErrorHandler(error));
  }
});

// GET ALL PRODUCT
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      message: "Products Fetch Successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
    // return next(new ErrorHandler(error));
  }
});

// GET QUERY PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById({ id });
    res.status(200).json({
      success: true,
      message: "Product Found",
      product,
    });
  } catch (error) {
    console.log(error);
    // return next(new ErrorHandler(error));
  }
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const { productName, description, quantity, price } = req.body;
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndUpdate(
      id,
      { productName, description, quantity, price },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product Successfully Updated!",
      product,
    });
  } catch (error) {
    console.log(error);
    // return next(new ErrorHandler(error));
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productModel.findByIdAndDelete({ id });
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    // return next(new ErrorHandler(error));
  }
});

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
