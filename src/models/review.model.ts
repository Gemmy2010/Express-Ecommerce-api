import mongoose from "mongoose";

interface ReviewInput {
  title: string;
  rating: number;
  comment: string;
}

interface ReviewDocument extends ReviewInput, mongoose.Document {
  user_id: mongoose.Schema.Types.ObjectId;
  product_id: mongoose.Schema.Types.ObjectId;
}

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },

  title: {
    type: String,
    required: [true, "Review title is required"],
  },
  comment: {
    type: String,
    required: [true, "Review comment is required"],
  },
  rating: {
    type: String,
    required: [true, "Review rating is required"],
  },
});

const Review = mongoose.model<ReviewDocument>("review", reviewSchema);

export default Review;
