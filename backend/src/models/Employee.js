import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  jobTitle: { type: String },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },

  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },

  country: String,
  state: String,
  city: String,
});

export default mongoose.model("Employee", employeeSchema);
