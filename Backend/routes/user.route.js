import { Router } from "express";
import {
    loginMethod,
    signupMethod,
    logoutMethod,
} from "../controllers/user.controller.js";

Router.route("/login", loginMethod);
Router.route("/signup", signupMethod);
Router.route("/logout", logoutMethod);
