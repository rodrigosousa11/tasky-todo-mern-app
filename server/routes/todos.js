const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const Todo = require("../models/Todo");

router.get("/all", authenticateToken, async (req, res) => {
	try {
		const userId = req.user;

		const todos = await Todo.find({ user: userId });

		res.json(todos);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch tasks" });
	}
});

router.post("/new", authenticateToken, async (req, res) => {
	const { title } = req.body;
	const userId = req.user;

	const todo = new Todo({
		title,
		user: userId,
	});

	await todo.save();
	res.json(todo);
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
	const taskId = req.params.id;
	const userId = req.user;

	const result = await Todo.findOneAndDelete({ _id: taskId, user: userId });

	if (!result) {
		return res
			.status(404)
			.json({ message: "Task not found or unauthorized" });
	}

	res.json(result);
});

router.put("/update/:id", authenticateToken, async (req, res) => {
	const taskId = req.params.id;
	const userId = req.user;

	try {
		const todo = await Todo.findOne({ _id: taskId, user: userId });

		if (!todo) {
			return res
				.status(404)
				.json({ message: "Task not found or unauthorized" });
		}

		todo.completed = !todo.completed;

		await todo.save();
		res.json(todo);
	} catch (error) {
		res.status(500).json({ message: "Update failed" });
	}
});

module.exports = router;
