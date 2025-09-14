import { Router } from "express";
import {
    currentUser,
    isCommentAuthorized,
} from "../middlewares/auth.middleware.js";
import { createReply } from "../controllers/reply.controller.js";
const router = Router();

router.post("/create/:parentId", currentUser, createReply);
// router.post("/delete/:targetId", isCommentAuthorized, addComment);

export default router;
