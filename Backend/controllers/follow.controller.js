import follow from "../models/follow.model.js";
import user from "../models/user.model.js";

const setFollow = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized request, please login to continue.",
        });
    }
    if (!req.params) {
        return res.status(400).json({
            success: false,
            message: "Missing req.params.",
        });
    }

    let totalFollowerCount = null;
    let totalFollowingCount = null;
    let updation = null;
    const { accountId } = req.params;
    if (!accountId) {
        return res.status(400).json({
            success: false,
            message: "Missing required parameter: accountId",
        });
    }

    const incFollowCount = async () => {
        try {
            const updatedFollowerCount = user
                .findByIdAndUpdate(
                    accountId,
                    { $inc: { followerCount: 1 } },
                    { new: true }
                )
                .select("followerCount");
            const updatedFollowingCount = user
                .findByIdAndUpdate(
                    req.user._id,
                    { $inc: { followingCount: 1 } },
                    { new: true }
                )
                .select("followingCount");

            updation = "Follower and following count increased.";
            totalFollowerCount = updatedFollowerCount.followerCount;
            totalFollowingCount = updatedFollowingCount.followingCount;
        } catch (error) {
            return res.status(502).json({
                success: false,
                message: "Error occured while increasing follow counts.",
                error: error,
            });
        }
    };
    const decFollowCount = async () => {
        try {
            const updatedFollowerCount = user
                .findByIdAndUpdate(
                    accountId,
                    { $inc: { followerCount: -1 } },
                    { new: true }
                )
                .select("followerCount");
            const updatedFollowingCount = user
                .findByIdAndUpdate(
                    req.user._id,
                    { $inc: { followingCount: -1 } },
                    { new: true }
                )
                .select("followingCount");

            updation = "Follower and following count decreased.";
            totalFollowerCount = updatedFollowerCount.followerCount;
            totalFollowingCount = updatedFollowingCount.followingCount;
        } catch (error) {
            return res.status(502).json({
                success: false,
                message: "Error occured while decreasing follow counts.",
                error: error,
            });
        }
    };

    const accountInstance = await user.findById(accountId).select("username");

    const followInstance = await follow.findOneAndDelete({
        account: accountId,
        follower: req.user._id,
    });

    if (!followInstance) {
        const createdFollow = await follow.create({
            account: accountId,
            follower: req.user._id,
        });
        if (!createdFollow) {
            return res.status(501).json({
                success: false,
                message: "Error occured while creating follow.",
            });
        } else {
            await incFollowCount();
            return res.status(200).json({
                success: false,
                message: `You followed ${accountInstance.username}.`,
                updation,
                totalFollowingCount,
            });
        }
    } else {
        await decFollowCount();
        return res.status(200).json({
            success: false,
            message: `You unfollowed ${accountInstance.username}.`,
            updation,
            totalFollowingCount,
        });
    }
};
export { setFollow };
