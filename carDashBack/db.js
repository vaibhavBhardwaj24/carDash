import { connect } from "mongoose";
const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  } catch (error) {
    console.error(error);
  }
};
export default connectDB;
