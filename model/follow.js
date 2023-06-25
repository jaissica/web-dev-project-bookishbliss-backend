import mongoose from "mongoose";

const follow = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  followee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, {collection: "follow", timestamps: true})

export default mongoose.model("follow", follow);