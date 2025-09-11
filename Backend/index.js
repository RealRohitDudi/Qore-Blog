import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import bodyParser from "body-parser";

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

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.get("/", (req, res) => {
    res.send("Qore is listening");
});
