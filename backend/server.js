import mongoose from "mongoose";
import app from "./index.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server Is Working On http://localhost:${process.env.PORT}`);
});
