import { Router } from "express";

import { setFollow } from "../controllers/follow.controller.js";
import { currentUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/set/:username", currentUser, setFollow);

export default router;
