import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
    imgurl: String,
    title: String,
    description: String
})

const articleModel = mongoose.model('article', articleSchema);

export default articleModel;