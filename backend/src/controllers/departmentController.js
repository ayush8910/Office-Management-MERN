import Department from "../models/Department.js";

export const createDepartment = async (req, res) => {
  try {
    const dept = await Department.create(req.body);
    res.json(dept);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDepartments = async (req, res) => {
  const depts = await Department.find();
  res.json(depts);
};


