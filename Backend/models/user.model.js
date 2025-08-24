import mongoose from 'mongoose'
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
    type: String,
        required: true,
        unique: true
    },
    email:{
    type: String,
        required: true,
        unique: true
    },
    age: {
        type:Number,
        min:1,
        max:100
    },
    totalPosts: Number,
    address: {
        type:String,
    },
    bio: String,
})

const user = mongoose.model('user', userSchema);
export default user;