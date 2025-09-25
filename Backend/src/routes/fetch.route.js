import { Router } from "express";

import { currentUser } from "../middlewares/auth.middleware.js";
import {
    getUser,
    getComments,
    getHomePosts,
    getSeriesPosts,
    getProfilePosts,
} from "../controllers/fetch.controller.js";

const router = Router();

router.get("/user/:username", currentUser, getUser);
router.post("/profile/posts/:username", currentUser, getProfilePosts);
router.get("/series/posts/:seriesId", currentUser, getSeriesPosts);
router.get("/comments/:postId", currentUser, getComments);

export default router;
