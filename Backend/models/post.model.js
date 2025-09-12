import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            max: 200,
            required: function () {
                return !this.isRepost;
            },
        },

        description: {
            type: String,
            max: 5000,
        },
        location: {
            type: String,
            max: 200,
        },
        musicId: {
            type: String,
            max: 200,
        },
        content: {
            type: String,
            max: 5000,
            required: function () {
                return !this.isRepost;
            },
        },
        tags: {
            type: String,
            max: 500,
        },
        repostCount: {
            type: Number,
            default: 0,
        },
        likeCount: { type: Number, default: 0 },

        commentCount: { type: Number, default: 0 },

        shares: {
            type: Number,
        },
        media: {
            type: String,
            max: 200,
        },
        series: {
            type: Schema.Types.ObjectId,
            ref: "series",
        },
        isRepost: {
            type: Boolean,
            required: true,
        },
        repostOf: {
            type: Schema.Types.ObjectId,
            ref: "post",
            required: function () {
                return this.isRepost;
            },
        },
        parentRepost: {
            type: Schema.Types.ObjectId,
            ref: "post",
        },
        visibility: {
            type: String,
            enum: ["public", "private", "unlisted", "draft"],
            default: "public",
        },
        altText: {
            type: String,
            max: 100,
        },
    },
    { timestamps: true }
);

const post = mongoose.model("post", postSchema);
export default post;
