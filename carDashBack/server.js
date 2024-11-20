import dotenv from "dotenv";
import connectDB from "./db.js";
import app from "./app.js";
dotenv.config({ path: ".env" });

console.log("starting");
await connectDB();
console.log("connected");
app.listen(process.env.PORT, () => {
  console.log("server working");
});
export default app;
