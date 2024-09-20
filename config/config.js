import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        console.log('CONNECTED');
        const url = 'mongodb+srv://JDTSOG:collegence@collegence.tuuxa.mongodb.net/';
        const conn = await mongoose.connect(url,{
            useUnifiedTopology: true
        });
        console.log(`Mongodb Database Connected!`);
    }
    catch(err){
            console.log(`Error : ${err.message}`);
    }
}

export default connectDB