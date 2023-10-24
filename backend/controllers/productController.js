import asyncHandler from "express-async-handler";

// create product
const createProduct = asyncHandler(async (req, res) => {
  res.send("Create Product");
});

// GET ALL PRODUCT
const getAllProdducts = asyncHandler(async (req, res) => {
  res.send("Get all data in database");
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

export {
  createProduct,
  getAllProdducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
