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
    res.status(500).json({error: "Error creating todo"});
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
