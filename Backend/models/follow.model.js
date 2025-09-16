import mongoose from "mongoose";
const { Schema } = mongoose;

const followSchema = new Schema(
    {
        account: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        follower: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true }
);

const follow = mongoose.model("follow", followSchema);
export default follow;
