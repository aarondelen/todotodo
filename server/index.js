import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from Express");
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).json({ erorr: err.message, stack: err.stack });
  }
});

app.post("/todos", async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        status,
      },
    });
    res.status(201).json(todo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status } = req.body;

  try {
    const updated = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        status,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.todo.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
