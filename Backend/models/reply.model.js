import mongoose from "mongoose";
const { Schema } = mongoose;

const replySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },

    parentType: {
        type: String,
        enum: ["post", "reply", "series"],
        required: true,
    },
    parentId: {
        type: Schema.Types.ObjectId,
        refPath: "parentType", // dynamic reference
        required: true,
    },
    replyText: {
        type: String,
        max: 500,
    },
    likeCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const reply = mongoose.model("reply", replySchema);

export default reply;
