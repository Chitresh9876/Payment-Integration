import mongoose from "mongoose";

export const connectDB = async()=>{
    const {connection} = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb is connected with ${connection.host}`);

    // client.connect()
    // .then(()=>{
    //     console.log(`Connected to mongoDB`);
    // })
    // .catch((err)=>{
    //     console.log(`error!, ${err}`);
    // });
};