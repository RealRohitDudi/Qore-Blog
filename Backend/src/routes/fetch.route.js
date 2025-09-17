import { Router } from "express";

import { currentUser } from "../middlewares/auth.middleware.js";
import {
    getUser,
    getComments,
    getHomePosts,
    getSeriesPosts,
    getUserPosts,
} from "../controllers/fetch.controller.js";

const router = Router();

router.get("/user/:username", currentUser, getUser);

export default router;
