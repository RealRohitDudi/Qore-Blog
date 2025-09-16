import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import replyRouter from "./routes/reply.route.js";
import likeRouter from "./routes/like.route.js";
import followRouter from "./routes/follow.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.listen(process.env.BACKEND_SERVER_PORT, async () => {
    console.log(`App is listening on port ${process.env.BACKEND_SERVER_PORT} `);
    try {
        const DBConnection = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        );
        console.log("Mongodb Connected success");
    } catch (error) {
        console.error(`Error connecting with mongoDB: ${error}`);
    }
});
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.originalUrl);
    next();
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/reply", replyRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/follow", followRouter);

app.get("/", (req, res) => {
    res.send("Qore is listening");
});
