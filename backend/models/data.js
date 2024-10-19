import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  day: { type: Date, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  features: {
    A: Number,
    B: Number,
    C: Number,
    D: Number,
    E: Number,
    F: Number,
  },
});


const Data = mongoose.model("Data",dataSchema);

export default Data;