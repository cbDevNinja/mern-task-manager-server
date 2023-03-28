// import mongoose, { ConnectOptions } from 'mongoose';

// export const connectDB = async (): Promise<void> => {

//   try {
//     const options: ConnectOptions = {
  
//     };
//     await mongoose.connect(process.env.MONGODB_URI as string, options as any);
//     console.log(`MongoDB Connected: ${mongoose.connection.host}`);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };


const mongoose = require('mongoose');

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI as string)
    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;