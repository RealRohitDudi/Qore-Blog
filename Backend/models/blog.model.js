import mongoose from 'mongoose';
const {Schema} = mongoose;

const blogSchema = new Schema({
    title:{
    type: String,
    max: 200,
    required: true
    },
    content:{
        type: String,
        max: 5000,
        required: true
    },
    media:{
        type: String
    }
})

const blog = mongoose.model('blog', blogSchema)
export default blog;