import mongoose from "mongoose";

const likebook = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  isbn13: String,
  image: String,
  title: String,
}, {collection: "likebook", timestamps: true})

export default mongoose.model("likebook", likebook);