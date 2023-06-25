import mongoose from "mongoose";

const booklist = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  intro: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  books: [{
    isbn13: String,
    image: String,
    title: String,
    subtitle: String,
    authors: String,
    rating: Number
  }]
}, {collection: "booklist", timestamps: true})

export default mongoose.model("booklist", booklist);