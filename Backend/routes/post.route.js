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
router.get("/get", getPost);
router.put("/update", isPostAuthorized, updatePost);
router.delete("/delete", isPostAuthorized, deletePost);

export default router;
