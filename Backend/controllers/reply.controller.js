import mongoose from "mongoose";
import post from "../models/post.model.js";
import reply from "../models/reply.model.js";
import series from "../models/series.model.js";

const createReply = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message:
                "Unauthenticated request. in order to make replies please login. ",
        });
    }
    if (!req.body) {
        return res.status(401).json({
            success: false,
            message: "Request body not found.",
        });
    }

    let updation = null;
    const { parentId } = req.params;
    const { parentType, replyText } = req.body;

    if (!parentType) {
        return res.status(402).json({
            success: false,
            message: "parentType is required in order to create reply.",
        });
    } else {
        if (
            parentType !== "post" &&
            parentType !== "reply" &&
            parentType !== "series"
        ) {
            return res.status(402).json({
                success: false,
                message:
                    "parentType must be equal to 'post', 'reply' or 'series' in order to create a reply.",
            });
        }
    }
    if (!replyText) {
        return res.status(402).json({
            success: false,
            message: "replyText is required in order to create reply.",
        });
    }
    if (!parentId) {
        return res.status(402).json({
            success: false,
            message: "parentId is required in order to create reply.",
        });
    }

    //create reply
    const createdReply = await reply.create({
        user: req.user._id,
        parentId: parentId,
        parentType: parentType,
        replyText: replyText,
    });
    console.log("createdReply: ", createdReply);

    if (!createdReply) {
        return res.status(402).json({
            success: false,
            message: "An unexpected error occured while creating reply.",
        });
    } else {
        // updation of replyCount
        if (parentType == "post") {
            const updatedPost = await post.findByIdAndUpdate(
                parentId,
                { $inc: { replyCount: 1 } },
                { new: true }
            );
            if (!updatedPost) {
                updation = "Error occured while updating replyCount on post.";
            } else {
                updation = "replyCount updated on post.";
            }
        } else if (parentType == "reply") {
            const updatedReply = await reply.findByIdAndUpdate(
                parentId,
                { $inc: { replyCount: 1 } },
                { new: true }
            );
            if (!updatedReply) {
                updation = "Error occured while updating replyCount on reply.";
            } else {
                updation = "replyCount updated on reply.";
            }
        } else if (parentType == "series") {
            const updatedSeries = await post.findByIdAndUpdate(
                parentId,
                { $inc: { replyCount: 1 } },
                { new: true }
            );
            if (!updatedSeries) {
                updation = "Error occured while updating replyCount on series.";
            } else {
                updation = "replyCount updated on series.";
            }
        }
        return res.status(202).json({
            success: false,
            message: "Reply created.",
            updation: updation,
        });
    }
};
export { createReply };
