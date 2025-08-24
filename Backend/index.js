import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();
app.use(cors())

app.listen(process.env.BACKEND_SERVER_PORT ,()=>{
    console.log(`App is listening on port ${process.env.BACKEND_SERVER_PORT} `)
})

app.get("/",(req, res)=>{
    res.send("Qore is listening")
});