import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import post from "../models/post.model.js";

const isLoggedIn = async (req, res, next) => {
    if (!req.cookies) {
        return res
            .status(401)
            .send("Session not found! Please login to continue.");
    }

    const accessToken = req.cookies.access_token;
    const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
    );

    const userExistence = await user.findById(decoded.id);

    console.log("type of userExistence._id is: ", userExistence._id);

    if (userExistence._id == decoded.id) {
        const refreshToken = await userExistence.generateRefreshToken();

        userExistence.refreshToken = refreshToken;
        await userExistence.save();

        const accessToken = await userExistence.generateAccessToken();
        return res
            .status(200)
            .cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            })
            .json({
                success: true,
                message: "Yes, You are loggen in.",
                user: {
                    id: userExistence._id,
                    email: userExistence.email,
                    username: userExistence.username,
                },
            });
    }
};

const isPostAuthorized = async (req, res) => {
    if (!req.cookies) {
        return res
            .status(402)
            .send("Session not found! Please login to continue.");
    }
    if (!req.body.post_id) {
        return res
            .status(403)
            .send(
                "The post you trying to edit might incorrect or doesn't exist"
            );
    }

    const postID = req.body.post_id;
    const accessToken = req.cookies.access_token;
    const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const postExistence = await post.findById(postID);

    console.log("postExistence.author is: ", postExistence.author);

    if (postExistence.author == decoded.id) {
        return next();
    } else {
        return res
            .status(302)
            .json({ code: "302", message: "Unauthorized request" });
    }
};

export { isLoggedIn, isPostAuthorized };
