import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "post",
    },
});

const comment = mongoose.model("comment", commentSchema);

export default comment;
