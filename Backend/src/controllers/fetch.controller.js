import { currentUser } from "../middlewares/auth.middleware.js";
import follow from "../models/follow.model.js";
import post from "../models/post.model.js";
import user from "../models/user.model.js";

const getUser = async (req, res) => {
    if (!req.params) {
        return res.status(301).json({
            success: false,
            message: "Missing parameter in request url.",
        });
    }
    const { username } = req.params;

    if (!username) {
        return res.status(301).json({
            success: false,
            message:
                "'username' parameter is required in order to fetch a user.",
        });
    }
    const accountInstance = await user
        .findOne({ username: username })
        .select(
            "-password -visibility -isDeleted -recentsActivities -hobbies -interests -refreshToken"
        );
    if (!accountInstance) {
        return res.status(403).json({
            success: false,
            message:
                "The user you are trying to fetch might not exist, restricted or deleted.",
        });
    }
    let isAccountFollowingUser = null;
    let isUserFollowingAccount = null;
    if (accountInstance) {
        if (req.user) {
            const userFollowing = await follow.findOne({
                account: accountInstance._id,
                follower: req.user._id,
            });
            console.log("userFollowing: ", userFollowing);
            if (userFollowing) {
                isUserFollowingAccount = true;
            }

            const accountFollowing = await follow.findOne({
                account: req.user._id,
                follower: accountInstance._id,
            });
            if (accountFollowing) {
                isAccountFollowingUser = true;
            }
            console.log("accountFollowing: ", accountFollowing);

            return res.status(200).json({
                success: true,
                message: "User found successfully.",
                user: { accountInstance },
                isAccountFollowingUser,
                isUserFollowingAccount,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "User found successfully. but you are not logged in.",
                user: { accountInstance },
            });
        }
    }
};

const getHomePosts = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            success: false,
            message: "Please login to continue.",
        });
    }
};
const getProfilePosts = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            success: false,
            message: "Login is required in order to get profile posts.",
        });
    }
    const { username } = req.params;
    if (!username) {
        return res.status(422).json({
            success: false,
            message:
                "'username' param is required in order to get profile posts.",
        });
    }
    console.log("req.body", req.body);

    const page = req.body;
    const limit = req.body || 10;
    const skip = (page - 1) * limit;

    if (!page) {
        return res.status(422).json({
            success: false,
            message: "'page' param is required in order to get profile posts.",
        });
    }

    const userInstance = user
        .findOne({ username: username })
        .select("username");
    if (!userInstance) {
        return res.status(303).json({
            success: false,
            message: "the user you requested to get posts of, not found.",
        });
    }

    try {
        const userPosts = post
            .find({ author: userInstance._id })
            .page(page)
            .limit(limit)
            .skip(limit);

        if (!userPosts) {
            return res.status(503).json({
                success: false,
                message: "UserPosts not found.",
                error: error,
            });
        }
        return res.status(202).json({
            success: true,
            message: "got some profile posts",
            page: page,
            limit: limit,
            skip: skip,
            posts: userPosts,
        });
    } catch (error) {
        return res.status(503).json({
            success: false,
            message: "Error occured while finding user posts.",
            error: error,
        });
    }
};

const getSeriesPosts = async (req, res) => {};
const getComments = async (req, res) => {};

export { getUser, getComments, getHomePosts, getSeriesPosts, getProfilePosts };
