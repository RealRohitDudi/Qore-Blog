import { Router } from "express";
import {
    currentUser,
    isCommentAuthorized,
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/add-comment", currentUser, addComment);
router.post("/delete-comment", isCommentAuthorized, addComment);

export default router;
