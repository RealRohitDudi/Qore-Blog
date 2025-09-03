import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    onPost: {
        type: Schema.Types.ObjectId,
        ref: "post",
    },
    onComment: {
        type: Schema.Types.ObjectId,
        ref: "comment",
    },
    onRepost: {
        type: Schema.Types.ObjectId,
        ref: "comment",
    },
    onSeries: {
        type: Schema.Types.ObjectId,
        ref: "comment",
    },
});

const like = mongoose.model("like", likeSchema);

export default like;
