import { useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

export default function EditEmployee() {
  const { id } = useParams();
  return <EmployeeForm id={id} />;
}
