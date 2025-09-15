import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    parentId: { type: Schema.Types.ObjectId, required: true },
    parentType: {
        type: String,
        enum: ["post", "reply", "series"],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

const like = mongoose.model("like", likeSchema);

export default like;
