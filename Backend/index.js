import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors())

app.listen(process.env.BACKEND_SERVER_PORT ,async ()=>{
    console.log(`App is listening on port ${process.env.BACKEND_SERVER_PORT} `);
    try {
        const DBConnection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Mongodb Connected success")
    } catch (error) {
        console.error(`Error connecting with mongoDB: ${error}`)
    }
})

app.get("/",(req, res)=>{
    res.send("Qore is listening")
});
