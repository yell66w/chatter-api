import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sfobp.mongodb.net/chat_app_database?retryWrites=true&w=majority`;

export const startDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("debug", true);

    console.log("MongoDB connected");
  } catch (error) {
    throw new Error(error.message);
  }
};
