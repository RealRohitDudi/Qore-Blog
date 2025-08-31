import mongoose from "mongoose";
const { Schema } = mongoose;

const repostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "post",
    },
});

const repost = mongoose.model("repost", repostSchema);
export default repost;
