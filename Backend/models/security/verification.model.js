import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const otpVerificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    currentOTP: {
        type: String,
        required: true,
    },
    creationTime: {
        type: Date,
        required: true,
    },
    expireTime: {
        type: Date,
        required: true,
    },
    useCase: {
        type: String,
        required: true,
    },
});
const otpVerification = new model("otpVerification", otpVerificationSchema);

const twoFactorAuthSchema = new Schema({
    isEnabled: {
        type: Boolean,
        default: false,
    },
    mediums: [
        {
            type: String,
        },
    ],
    priorityMedium: {
        type: String,
    },
});

const twoFactorAuth = mongoose.model("twoFactorAuth", twoFactorAuthSchema);
