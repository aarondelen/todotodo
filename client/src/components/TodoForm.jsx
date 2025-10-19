import { useEffect, useState } from "react";

const TodoForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "LOW",
    status: "PENDING",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dueDate: initialData.dueDate?.split("T")[0] || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dueDate"
        className="w-full p-2 border rounded"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <select
        name="priority"
        className="w-full p-2 border rounded"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

      <select
        name="status"
        className="w-full p-2 border rounded"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="PENDING">Pending</option>
        <option value="ONGOING">Ongoing</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition">
        {initialData ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
