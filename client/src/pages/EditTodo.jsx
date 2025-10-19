import TodoForm from "../components/TodoForm";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const EditTodo = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todos/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, updatedData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!formData) return <p>Todo not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <TodoForm onSubmit={handleSubmit} initialData={formData} />
    </div>
  );
};

export default EditTodo;
