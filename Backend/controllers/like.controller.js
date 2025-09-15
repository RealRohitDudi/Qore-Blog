import like from "../models/like.model.js";
import reply from "../models/reply.model.js";
import post from "../models/post.model.js";
import series from "../models/series.model.js";

const setLike = async (req, res) => {
    if (!req.params) {
        return res.status(404).json({
            success: false,
            message: "Where is req.params? eh?",
        });
    }

    if (!req.user) {
        return res.status(404).json({
            success: false,
            message: "Login is required in order to create a like.",
        });
    }

    let updation = null;
    let totalLikeCount = null;
    const { parentId } = req.params;
    const { parentType } = req.body;

    if (!parentId) {
        return res.status(404).json({
            success: false,
            message: "parentId is required in order to create a like.",
        });
    }

    if (!parentType) {
        return res.status(402).json({
            success: false,
            message: "parentType is required in order to create a like.",
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
                    "parentType must be equal to 'post', 'reply' or 'series' in order to create a like.",
            });
        }
    }

    const incLikeCount = async () => {
        if (parentType == "post") {
            const updatedPost = await post
                .findByIdAndUpdate(
                    parentId,
                    { $inc: { likeCount: 1 } },
                    { new: true }
                )
                .select("likeCount");
            if (!updatedPost) {
                updation = "Error occured while updating likeCount on post.";
            } else {
                updation = "likeCount updated on post.";
            }
            totalLikeCount = updatedPost.likeCount;
        } else if (parentType == "reply") {
            const updatedReply = await reply
                .findByIdAndUpdate(
                    parentId,
                    { $inc: { likeCount: 1 } },
                    { new: true }
                )
                .select("likeCount");
            if (!updatedReply) {
                updation = "Error occured while updating likeCount on reply.";
            } else {
                updation = "likeCount updated on reply.";
            }
            console.log("updatedReply", updatedReply);

            totalLikeCount = updatedReply.likeCount;
        } else if (parentType == "series") {
            const updatedSeries = await series
                .findByIdAndUpdate(
                    parentId,
                    { $inc: { likeCount: 1 } },
                    { new: true }
                )
                .select("likeCount");
            if (!updatedSeries) {
                updation = "Error occured while updating likeCount on series.";
            } else {
                updation = "likeCount updated on series.";
            }
            totalLikeCount = updatedSeries.likeCount;
        }
    };
    const decLikeCount = async () => {
        if (parentType == "post") {
            const updatedPost = await post
                .findByIdAndUpdate(
                    parentId,
                    { $inc: { likeCount: -1 } },
                    { new: true }
                )
                .select("likeCount");
            if (!updatedPost) {
                updation = "Error occured while updating likeCount on post.";
            } else {
                updation = "likeCount updated on post.";
            }
            totalLikeCount = updatedPost.likeCount;
        } else if (parentType == "reply") {
            const updatedReply = await reply
                .findByIdAndUpdate(
                    parentId,
                    { $inc: { likeCount: -1 } },
                    { new: true }
                )
                .select("likeCount");
            if (!updatedReply) {
                updation = "Error occured while updating likeCount on reply.";
            } else {
                updation = "likeCount updated on reply.";
            }
            totalLikeCount = updatedReply.likeCount;
        } else if (parentType == "series") {
            const updatedSeries = await series
                .findByIdAndUpdate(
                    parentId,
                    { $inc: { likeCount: -1 } },
                    { new: true }
                )
                .select("likeCount");
            if (!updatedSeries) {
                updation = "Error occured while updating likeCount on series.";
            } else {
                updation = "likeCount updated on series.";
            }
            totalLikeCount = updatedSeries.likeCount;
        }
    };

    const likeInstance = await like.findOneAndDelete({
        parentId: parentId,
        parentType: parentType,
        user: req.user._id,
    });

    if (!likeInstance) {
        const createdLike = await like.create({
            parentId: parentId,
            user: req.user._id,
            parentType: parentType,
        });

        if (!createdLike) {
            return res.status(300).json({
                success: false,
                message:
                    "Unexpected error occured while creating like for given parentType.",
            });
        } else {
            // updation of likeCount
            await incLikeCount();
            return res.status(200).json({
                success: true,
                message: "Post liked successfully.",
                updation: updation,
                totalLikes: totalLikeCount,
            });
        }
    } else {
        // updation of replyCount
        await decLikeCount();

        return res.status(200).json({
            success: true,
            message: "post unliked successfully.",
            totalPostLikes: totalLikeCount,
        });
    }
};

export { setLike };
