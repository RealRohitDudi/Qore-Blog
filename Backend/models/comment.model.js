import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    targetType: {
        type: String,
        enum: ["post", "comment", "repost", "series"],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

const comment = mongoose.model("comment", commentSchema);

export default comment;
