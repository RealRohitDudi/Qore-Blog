import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    onPost: {
        type: Schema.Types.ObjectId,
        ref: "post",
    },
    onSeries: {
        type: Schema.Types.ObjectId,
        ref: "comment",
    },
    onRepost: {
        type: Schema.Types.ObjectId,
        ref: "comment",
    },
});

const comment = mongoose.model("comment", commentSchema);

export default comment;
