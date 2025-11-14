import { useEffect, useState } from "react";
import { api } from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, [search, department, page]);

  const loadEmployees = async () => {
    const res = await api.get("/employees", {
      params: { search, department, page, limit },
    });
    setEmployees(res.data.data);
  };

  const loadDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  return (
    <div>
      <h2>Employee List</h2>

      <div className="form-box">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Job</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department?.name}</td>
              <td>{emp.jobTitle}</td>
              <td>
                <a href={`/edit/${emp._id}`}>
                  <button>Edit</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span> Page {page} </span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
