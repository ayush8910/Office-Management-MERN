import Employee from "../models/Employee.js";

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEmployees = async (req, res) => {
  const {
    search = "",
    department,
    jobTitle,
    page = 1,
    limit = 10,
  } = req.query;

  let employees = await Employee.find()
    .populate("department")
    .populate("supervisor");

  if (search) {
    const s = search.toLowerCase();
    employees = employees.filter((emp) =>
      emp.name.toLowerCase().includes(s) ||
      emp.email.toLowerCase().includes(s)
    );
  }

  if (department) {
    employees = employees.filter(
      (emp) => emp.department?._id.toString() === department
    );
  }

  if (jobTitle) {
    employees = employees.filter((emp) => emp.jobTitle === jobTitle);
  }

  const total = employees.length;               
  const start = (page - 1) * limit;              
  const end = start + Number(limit);             
  const paginatedEmployees = employees.slice(start, end);

  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
    data: paginatedEmployees,
  });
};


export const updateEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};
