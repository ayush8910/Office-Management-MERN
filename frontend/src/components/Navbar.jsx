import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
  <div className="nav-container">
    <h2 className="logo">Office Manager</h2>

    <div className="nav-links">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Employees
      </Link>

      <Link
        to="/add"
        className={location.pathname === "/add" ? "active" : ""}
      >
        Add Employee
      </Link>

      <Link
        to="/departments"
        className={location.pathname === "/departments" ? "active" : ""}
      >
        Departments
      </Link>
    </div>
  </div>
</nav>

  );
}
