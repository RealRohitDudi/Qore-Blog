import { Router } from "express";

const router = Router();

import { setLike } from "../controllers/like.controller.js";
import { currentUser } from "../middlewares/auth.middleware.js";

router.post("/set/:parentId", currentUser, setLike);

export default router;
