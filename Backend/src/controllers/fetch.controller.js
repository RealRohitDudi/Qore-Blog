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
    const accountInstance = await user.findOne({ username: username });
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
const getUserPosts = async (req, res) => {};
const getSeriesPosts = async (req, res) => {};
const getComments = async (req, res) => {};

export { getUser, getComments, getHomePosts, getSeriesPosts, getUserPosts };
