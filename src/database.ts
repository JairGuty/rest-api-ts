import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGODB_URI || 'database url')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));