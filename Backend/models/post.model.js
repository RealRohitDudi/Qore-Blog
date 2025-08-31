import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        max: 200,
        required: true,
    },
    content: {
        type: String,
        max: 5000,
        required: true,
    },
    reposts: {
        type: Schema.Types.ObjectId,
        ref: "repost",
    },
    likes: {
        type: Schema.Types.ObjectId,
        ref: "like",
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "comment",
    },
    shares: {
        type: Number,
    },
    media: {
        type: String,
    },
    series: {
        type: Schema.Types.ObjectId,
        ref: "series",
        required: false,
    },
});

const post = mongoose.model("post", postSchema);
export default post;
