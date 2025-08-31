import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "post",
    },
});

const like = mongoose.model("like", likeSchema);

export default like;
