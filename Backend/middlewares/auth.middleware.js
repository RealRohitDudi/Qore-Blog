import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import post from "../models/post.model.js";
import reply from "../models/reply.model.js";

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
                message:
                    "Yes, You are loggen in. refresh & access tokens are changed",
                user: {
                    id: userExistence._id,
                    email: userExistence.email,
                    username: userExistence.username,
                },
            });
    }
};

const currentUser = async (req, res, next) => {
    if (!req.cookies) {
        return res
            .status(401)
            .send("Session not found! Please login to continue.");
    }

    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res
            .status(401)
            .send("Session not found! Please login to continue.");
    }
    const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
    );

    const userExistence = await user.findById(decoded.id);
    if (!userExistence) {
        req.user = null;
        return next();
    } else {
        req.user = userExistence;
        return next();
    }
};

const isPostAuthorized = async (req, res, next) => {
    if (!req.cookies) {
        return res
            .status(402)
            .send("Session not found! Please login to continue.");
    }
    if (!req.params) {
        return res.status(404).json({
            success: false,
            message: "Could you tell us which post do you want to edit?",
        });
    }

    const { postId } = req.params;
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res
            .status(402)
            .send("AccessToken not found! Please login to continue.");
    }
    const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const postExistence = await post.findById(postId);

    console.log("postExistence is: ", postExistence);

    if (postExistence.author == decoded.id) {
        return next();
    } else {
        return res
            .status(302)
            .json({ code: "302", message: "Unauthorized request" });
    }
};

const isCommentAuthorized = async (req, res) => {
    if (!req.cookies) {
        return res
            .status(402)
            .send("Session not found! Please login to continue.");
    }
    if (!req.body.comment_id) {
        return res
            .status(403)
            .send(
                "The post you trying to edit might incorrect or doesn't exist"
            );
    }

    const commentID = req.body.comment_id;
    const accessToken = req.cookies.access_token;
    const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const commentExistence = await comment.findById(commentID);

    console.log("commentExistence.author is: ", commentExistence.user);

    if (commentExistence.user == decoded.id) {
        return next();
    } else {
        return res
            .status(302)
            .json({ code: "302", message: "Unauthorized request" });
    }
};
const isLikeAuthorized = async (req, res) => {
    if (!req.cookies) {
        return res
            .status(402)
            .send("Session not found! Please login to continue.");
    }
    if (!req.body.comment_id) {
        return res
            .status(403)
            .send(
                "The post you trying to edit might incorrect or doesn't exist"
            );
    }

    const commentID = req.body.comment_id;
    const accessToken = req.cookies.access_token;
    const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const commentExistence = await comment.findById(commentID);

    console.log("commentExistence.author is: ", commentExistence.user);

    if (commentExistence.user == decoded.id) {
        return next();
    } else {
        return res
            .status(302)
            .json({ code: "302", message: "Unauthorized request" });
    }
};

export { currentUser, isLoggedIn, isPostAuthorized, isCommentAuthorized };
