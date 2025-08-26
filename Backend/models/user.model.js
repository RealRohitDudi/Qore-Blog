import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
    },
    totalPosts: { type: Number, default: 0 },
    address: {
        type: String,
        max: 300,
    },
    bio: {
        type: String,
        max: 300,
    },
    password: {
        type: String,
    },
    twoFactorAuth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
    },
    refreshToken: {},
    accessToken: {},
});

const user = mongoose.model("user", userSchema);
export default user;
