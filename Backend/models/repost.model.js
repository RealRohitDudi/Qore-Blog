import mongoose from "mongoose";
const { Schema } = mongoose;

const repostSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        onPost: {
            type: Schema.Types.ObjectId,
            ref: "post",
        },
        onRepost: {
            type: Schema.Types.ObjectId,
            ref: "post",
        },
    },
    { timestamps: true }
);

const repost = mongoose.model("repost", repostSchema);
export default repost;
