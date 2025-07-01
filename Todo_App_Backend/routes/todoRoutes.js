const express = require("express");
const auth = require("../middleware/authMiddleware");
const { Todo } = require("../models");

const router = express.Router();

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const todoData = { ...req.body, userId: req.user.id };
    
    // Handle empty due date
    if (todoData.dueDate === '' || todoData.dueDate === null || todoData.dueDate === undefined) {
      todoData.dueDate = null;
    }
    
    const todo = await Todo.create(todoData);
    res.json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(400).json({ 
      error: "Failed to create todo", 
      details: error.errors ? error.errors.map(e => e.message) : error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    
    const updateData = { ...req.body };
    
    // Handle empty due date
    if (updateData.dueDate === '' || updateData.dueDate === null || updateData.dueDate === undefined) {
      updateData.dueDate = null;
    }
    
    await todo.update(updateData);
    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(400).json({ 
      error: "Failed to update todo", 
      details: error.errors ? error.errors.map(e => e.message) : error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;