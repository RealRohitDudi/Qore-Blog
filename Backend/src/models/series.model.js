import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
const seariesSchema = new Schema(
    {
        name: {
            type: String,
            max: 100,
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "blog",
            },
        ],
        likeCount: { type: Number, default: 0 },
        replyCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const series = mongoose.model("series", seariesSchema);

export default seariesSchema;
