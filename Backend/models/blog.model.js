import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
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
    media: {
        type: String,
    },
    series: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "series",
        required: false,
    },
});

const blog = mongoose.model("blog", blogSchema);
export default blog;
