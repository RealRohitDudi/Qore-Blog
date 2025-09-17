import { Router } from "express";
import {
    loginMethod,
    signupMethod,
    logoutMethod,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", (req, res) => {
    loginMethod(req, res);
});
//same working, express automatically send (req,res,next) under the hood
router.post("/signup", signupMethod);
router.post("/logout", logoutMethod);
router.get("/is-logged-in", isLoggedIn);

export default router;
