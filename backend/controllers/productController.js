import asyncHandler from "express-async-handler";

// create product
const createProduct = asyncHandler(async (req, res) => {
  res.send("Create Product");
});

// GET ALL PRODUCT
const getProducts = asyncHandler(async (req, res) => {
  res.send("Get All products");
});

// GET QUERY PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  res.send("Get Single Data queried");
});

const updateProduct = asyncHandler(async (req, res) => {
  res.send("Update Product");
});

const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete product");
});

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
