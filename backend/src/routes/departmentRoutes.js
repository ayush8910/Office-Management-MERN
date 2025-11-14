import express from "express";
import { createDepartment, getDepartments } from "../controllers/departmentController.js";

const router = express.Router();

router.post("/", createDepartment);
router.get("/", getDepartments);
router.delete("/:id", async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
