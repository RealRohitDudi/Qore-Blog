import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
const seariesSchema = new Schema({
    name: {
        type: String,
        max: 100,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog",
        },
    ],
});

const series = mongoose.model("series", seariesSchema);

export default seariesSchema;
