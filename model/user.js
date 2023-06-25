import mongoose from "mongoose";

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: String,
  bio: String,
  location: String,
  dob: Date,
  website: String,
  email: String,
  role: {
    type: String,
    enum: ["common", "creator", "admin"],
    default: "common"
  }
}, {collection: "user"})

export default mongoose.model("user", user);