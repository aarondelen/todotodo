import TodoForm from "../components/TodoForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTodo = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:3000/todos", formData);
      navigate("/");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Todo</h1>
      <TodoForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTodo;
1