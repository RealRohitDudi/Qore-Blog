import { Router } from "express";
import { currentUser } from "../middlewares/auth.middleware.js";
import { createReply, deleteReply } from "../controllers/reply.controller.js";
const router = Router();

router.post("/create/:parentId", currentUser, createReply);
router.delete("/delete/:replyId", currentUser, deleteReply);

export default router;
