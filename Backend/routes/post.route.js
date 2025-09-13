import { Router } from "express";

import {
    createPost,
    getPost,
    updatePost,
    deletePost,
    likePost,
    createRepost,
    createRequote,
} from "../controllers/post.controller.js";
import {
    currentUser,
    isPostAuthorized,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", currentUser, createPost);
router.get("/get-post/:postId", currentUser, getPost);
router.patch("/update/:postId", isPostAuthorized, updatePost);
router.delete("/delete/:postId", isPostAuthorized, deletePost);
router.post("/like/:postId", currentUser, likePost);
router.post("/repost/:postId", currentUser, createRepost);
router.post("/requote/:postId", currentUser, createRequote);

export default router;
