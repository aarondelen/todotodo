import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/todos");
        setTodos(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading todos...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl fpnt-bold mb-4">Your Todos</h1>

      {todos.length === 0 ? (
        <p className="text-gray-500">No todos found. Add one!</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{todo.title}</p>
                <p className="text-sm text-gray-500">{todo.description}</p>
              </div>

              <div className="space-x-2">
                <button
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded cursor-pointer transition"
                  onClick={() => navigate(`/edit/${todo.id}`)}
                >
                  Edit
                </button>

                <button
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer transition"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
