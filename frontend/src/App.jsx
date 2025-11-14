import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Navbar from "./components/Navbar";
import Departments from "./pages/Departments";
export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </BrowserRouter>
  );
}
