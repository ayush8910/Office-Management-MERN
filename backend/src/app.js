import express from "express";
import cors from "cors";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");

  app.use(express.static(frontendPath));

  app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

}
export default app;
