import post from "../models/post.model.js";
import like from "../models/like.model.js";
import repost from "../models/repost.model.js";
import comment from "../models/comment.model.js";
import mongoose from "mongoose";

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

    const postInstance = await post.create({
        author: req.user._id,
        title: title,
        content: content,
        description: description ? description : null,
        location: location ? location : null,
        musicId: musicId ? musicId : null,
        tags: tags ? tags : null,
        media: media ? media : null,
        series: series ? series : null,
        altText: altText ? altText : null,
        isRepost: false,
    });

    if (!postInstance) {
        return res.status(300).json({
            success: false,
            message:
                "an unexpected Error occured while creating post. please try again.",
        });
    } else {
        return res.status(200).json({
            success: true,
            message: "Post created successfully.",
            postId: postInstance._id,
        });
    }
};

const getPost = async (req, res) => {
    console.log("getPost method invoked!");

    if (!req.params) {
        return res.status(404).json({
            success: "false",
            message: "Could you tell us which post do you want to get?",
        });
    }
    const { postId } = req.params;

    const postInstance = await post.findById(postId);

    if (!req.user) {
        return res.status(200).json({
            success: true,
            message: "Got it!",
            post: { postInstance },
        });
    } else {
        const isLiked = await like.findOne({
            targetType: "post",
            user: req.user._id,
        });
        return res.status(200).json({
            success: true,
            message: "Got it!",
            post: { postInstance },
            isLiked: isLiked,
        });
    }
};

//verified
const updatePost = async (req, res) => {
    if (!req.body) {
        return res.status(300).json({
            success: false,
            message: "req.body not found",
        });
    }
    if (!req.params) {
        return res.status(404).json({
            success: false,
            message: "Could you tell us which post do you want to edit?",
        });
    }
    const {
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

    const { postId } = req.params;

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (location !== undefined) updateFields.location = location;
    if (musicId !== undefined) updateFields.musicId = musicId;
    if (content !== undefined) updateFields.content = content;
    if (tags !== undefined) updateFields.tags = tags;
    if (media !== undefined) updateFields.media = media;
    if (series !== undefined) updateFields.series = series;
    if (altText !== undefined) updateFields.altText = altText;

    const updatedPost = await post.findByIdAndUpdate(postId, {
        $set: updateFields,
    });

    if (!updatedPost) {
        return res.status(303).json({
            success: false,
            message:
                "Unexpected error occured while creating post. pleaase try again.",
        });
    } else {
        return res.status(200).json({
            success: true,
            message: "Post updated successfully!",
            post: { updatedPost },
        });
    }
};
const deletePost = async (req, res) => {
    if (!req.params) {
        return res.status(404).json({
            success: false,
            message: "Could you tell us which post do you want to edit?",
        });
    }
    const { postId } = req.params;

    const deletedPost = await post.findByIdAndDelete(postId);
    if (!deletedPost) {
        return res.status(300).json({
            success: false,
            message: "Error occured while deleting post.",
        });
    } else {
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully!",
        });
    }
};

const likePost = async (req, res) => {
    if (!req.params) {
        return res.status(404).json({
            success: false,
            message: "Can you tell us which post do you want to like?",
        });
    }
    const { postId } = req.params;

    if (!req.user) {
        return res.status(404).json({
            success: false,
            message: "Login is required in order to like a post.",
        });
    }
    const likeInstance = await like.findOneAndDelete({
        targetId: postId,
        user: req.user._id,
    });

    console.log("likeInstance is:", likeInstance);

    if (!likeInstance) {
        const createdLike = await like.create({
            targetId: postId,
            user: req.user._id,
            targetType: "post",
        });
        const updatedPost = await post.findByIdAndUpdate(
            postId,
            { $inc: { likeCount: 1 } },
            { new: true }
        );

        if (!createdLike) {
            return res.status(300).json({
                success: false,
                message:
                    "Unexpected error occured while creating like for given post",
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Post liked successfully.",
                totalPostLikes: updatedPost.likeCount,
            });
        }
    } else {
        const updatedPost = await post.findByIdAndUpdate(
            postId,
            { $inc: { likeCount: -1 } },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "post unliked successfully.",
            totalPostLikes: updatedPost.likeCount,
        });
    }
};

const createRepost = async (req, res) => {
    if (!req.params) {
        return res.status(404).json({
            success: false,
            message: "Can you tell us which post do you want to repost?",
        });
    }
    const { postId } = req.params;

    if (!req.user) {
        return res.status(404).json({
            success: false,
            message: "Login is required in order to repost a post.",
        });
    }

    const givenPost = await post.findById(postId).select("isRepost");

    if (givenPost.isRepost) {
        return res.status(410).json({
            success: false,
            message:
                "dumb hacker error. The post you are trying to repost is already a repost. try reposting a post.",
        });
    }

    const repostInstance = await post.findOneAndDelete({
        author: req.user._id,
        repostOf: postId,
    });

    if (!repostInstance) {
        const createdRepost = await post.create({
            author: req.user._id,
            isRequot: false,
            isRepost: true,
            repostOf: postId,
        });
        if (!createdRepost) {
            return res.status(303).json({
                success: false,
                message: "An unexpected error occured while creating repost.",
            });
        } else {
            const updatedPost = await post.findByIdAndUpdate(
                postId,
                { $inc: { repostCount: 1 } },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Repost created successfully.",
            });
        }
    } else {
        const updatedPost = await post.findByIdAndUpdate(
            postId,
            { $inc: { repostCount: -1 } },
            { new: true }
        );
        return res
            .status(200)
            .json({ success: true, message: "repost removed successfully." });
    }
};

export { createPost, getPost, updatePost, deletePost, likePost, createRepost };
