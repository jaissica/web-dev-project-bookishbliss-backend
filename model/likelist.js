import mongoose from "mongoose";

const likelist = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  bookList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "booklist"
  }
}, {collection: "likelist", timestamps: true})

export default mongoose.model("likelist", likelist);