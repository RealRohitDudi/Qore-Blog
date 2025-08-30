import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    fullName: {
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
    refreshToken: {
        type: String,
        default: null,
    },
});

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0//", salt);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(11);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(err);
    }
});

userSchema.methods.isPasswordCorrect = async (password) => {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async () => {
    return jwt.sign(
        {
            id: this._id,
            username: this.userSchema,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};
userSchema.methods.generateRefreshToken = async () => {
    return jwt.sign(
        {
            id: this._id,
            username: this.userSchema,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

const user = mongoose.model("user", userSchema);
export default user;
