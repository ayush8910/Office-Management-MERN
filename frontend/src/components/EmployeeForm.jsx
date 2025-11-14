import { useEffect, useState } from "react";
import { api } from "../api";

export default function EmployeeForm({ id }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    country: "",
    state: "",
    city: "",
    department: "",
    supervisor: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Load initial data
  useEffect(() => {
    loadDepartments();
    loadEmployees();

    if (id) loadEmployee();
  }, [id]);

  const loadDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  const loadEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data.data);
  };

  const loadEmployee = async () => {
    const res = await api.get(`/employees/${id}`);
    setData(res.data);
  };

  // Country → State
  const handleCountry = async (country) => {
    setData({ ...data, country });
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    });
    const json = await res.json();
    setStates(json.data.states);
  };

  // State → City
  const handleState = async (state) => {
    setData({ ...data, state });
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: data.country, state }),
    });
    const json = await res.json();
    setCities(json.data);
  };

  const saveEmployee = async () => {
    if (id) {
      await api.put(`/employees/${id}`, data);
    } else {
      await api.post(`/employees`, data);
    }

    window.location.href = "/";
  };

  return (
    <div className="form-box">
      <h2>{id ? "Edit" : "Add"} Employee</h2>

      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        placeholder="Job Title"
        value={data.jobTitle}
        onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
      />

      
      <select onChange={(e) => handleCountry(e.target.value)}>
        <option>Select country</option>
        <option>India</option>
        <option>USA</option>
      </select>

      <select onChange={(e) => handleState(e.target.value)}>
        <option>Select state</option>
        {states.map((st) => (
          <option key={st.name}>{st.name}</option>
        ))}
      </select>

      <select onChange={(e) => setData({ ...data, city: e.target.value })}>
        <option>Select city</option>
        {cities.map((ct) => (
          <option key={ct}>{ct}</option>
        ))}
      </select>

      <select onChange={(e) => setData({ ...data, department: e.target.value })}>
        <option value="">Select department</option>
        {departments.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setData({ ...data, supervisor: e.target.value })}>
        <option value="">No supervisor</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <button onClick={saveEmployee}>Save</button>
    </div>
  );
}
