import post from "../models/post.model.js";
import like from "../models/like.model.js";
import repost from "../models/repost.model.js";
import comment from "../models/comment.model.js";

const createPost = async (req, res) => {
    if (!req.user) {
        return res.status(300).json({
            success: false,
            message:
                "User is not available in request. please login to continue.",
        });
    }

    if (!req.body) {
        return res.status(300).json({
            success: false,
            message: "req.body not found",
        });
    }

    const {
        author = null,
        title = null,
        description = null,
        location = null,
        musicId = null,
        content = null,
        tags = null,
        media = null,
        series = null,
        altText = null,
    } = req.body;

    if (title.length <= 0 || content.length <= 0) {
        return res.status(300).json({
            success: false,
            message:
                "Title or content is missing. both are required to make post ",
        });
    }

    console.log("req.user._id is: ", req.user._id);

    const postInstance = post.create({ author: req.user._id, title: title });
};

const getPost = async (req, res) => {};
const updatePost = async (req, res) => {};
const deletePost = async (req, res) => {};
