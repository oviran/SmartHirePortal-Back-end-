import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!(process.env.MONGODB_DATABASE as string)){
      return new Error ("Missing MONGODB_DATABASE env variable.")

    }
    await mongoose.connect(process.env.MONGODB_DATABASE as string);
    console.log("DB connections successful!");
  } catch (error) {
    console.log(error);
  }
};