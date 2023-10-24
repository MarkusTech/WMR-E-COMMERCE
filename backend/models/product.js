import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please enter product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter description!"],
    },
    quantity: {
      type: String,
      required: [true, "Please enter quantity!"],
    },
    price: {
      type: String,
      required: [true, "Please enter price"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
