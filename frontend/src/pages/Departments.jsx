import { useEffect, useState } from "react";
import { api } from "../api";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  const addDepartment = async () => {
    if (!name.trim()) return alert("Department name required");

    await api.post("/departments", { name });

    setName("");
    loadDepartments();
  };

  const deleteDepartment = async (id) => {
    if (!confirm("Delete this department?")) return;

    await api.delete(`/departments/${id}`);
    loadDepartments();
  };

  return (
    <div>
      <h2>Departments</h2>

      <div className="form-box">
        <h3>Add New Department</h3>

        <input
          type="text"
          placeholder="Department name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addDepartment}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Department Name</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {departments.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>
                <button
                  onClick={() => deleteDepartment(d._id)}
                  style={{ background: "crimson" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
