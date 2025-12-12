import mongoose from 'mongoose';


const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Connected DB");
    })

    await mongoose.connect(`${process.env.MONGO_URI}/book`)

}

export default connectDB;