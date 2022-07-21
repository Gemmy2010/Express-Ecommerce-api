import mongoose from "mongoose";

interface ProductInput {
  image: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  rating: number;
  numReviews: number;
}

export interface ProductDocument extends ProductInput, mongoose.Document {}

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "product image is required "],
    },

    name: {
      type: String,
      required: [true, "Product is required"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },
    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: [true, "Count  in stock is required"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDocument>("product", productSchema);

export default Product;
