import express from "express";
import cors from "cors";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);

export default app;
