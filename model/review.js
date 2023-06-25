import mongoose from "mongoose";

const review = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  book: String, // isbn
  content: String
}, {collection: "review", timestamps: true})

export default mongoose.model("review", review);