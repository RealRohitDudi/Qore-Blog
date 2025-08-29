import user from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const loginMethod = async (req, res) => {
    if (!req.body) throw new error("Body is not available in request!");
    const { email = null, password = null, username = null } = req.body;

    if ((!email || !password) && (!username || !password)) {
        return res.status(401).json({ message: "Bad Request! empty fields" });
    }

    const userExistence = await user.findOne({
        $or: [{ username: username }, { email: email }],
    });
    if (!userExistence) {
        throw new error(
            "This user does not exist. please create your account or try with correct credentials."
        );
    }

    if (await userExistence.isPasswordCorrect(password)) {
        const refreshToken = await userExistence.generateRefreshToken();

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        );

        console.log("userExistence._id: ", userExistence._id);

        //only generate access token if refresh token is have this.user.id
        if (decoded.id == userExistence._id) {
            const AccessToken = await userExistence.generateAccessToken();
            return res
                .status(200)
                .cookie("token", userExistence._id, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                })
                .json({ cookie: { httpOnly: true, secure: true } });
        } else {
            return res
                .status(300)
                .json({ message: "Invalid data detected, try again." });
        }
    } else {
        return res.status(300).json({ message: "This password is incorrect" });
    }
};
const signupMethod = () => {
    const {
        email = null,
        username = null,
        password = null,
        fullName = null,
        age = null,
    } = req.body;

    if (!email || !password || !username || !password || !fullName || !age) {
        return res.status(401).json({ message: "Bad Request! empty fields" });
    }

    userInstance = user;
};
const logoutMethod = () => {};

export { loginMethod, signupMethod, logoutMethod };
