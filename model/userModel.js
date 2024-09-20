import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is Required']
    },
    email:{
        type:String,
        required: [true, 'Email is Required']
    },
    password:{
        type: String,
        required:[true, 'Password is Required']
    },
    college:{
        type: String,
        default: false
    },
    course:{
        type: String,
        default: null
    },
    year:{
        type: String,
        default: null
    },
    imgurl:{
        type: String,
        default: null
    },
    Interest:{
        type:String,
        default: null
    }
}, {timestamps:true}
);

const userModel = mongoose.model('user', userSchema);

export default userModel;
