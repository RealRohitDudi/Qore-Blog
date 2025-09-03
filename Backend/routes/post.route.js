import { Router } from "express";

import {
    createPost,
    getPost,
    updatePost,
    deletePost,
} from "../controllers/post.controller.js";
import {
    currentUser,
    isPostAuthorized,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", currentUser, createPost);
router.get("/get-post/:postId", getPost);
router.patch("/update/:postId", isPostAuthorized, updatePost);
router.delete("/delete", isPostAuthorized, deletePost);

export default router;
