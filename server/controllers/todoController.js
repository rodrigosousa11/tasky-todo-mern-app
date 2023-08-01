const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
	try {
		const userId = req.user;
		const todos = await Todo.find({ user: userId });
		res.json(todos);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch tasks" });
	}
};

const createNewTodo = async (req, res) => {
	const { title } = req.body;
	const userId = req.user;

	const todo = new Todo({
		title,
		user: userId,
	});

	try {
		await todo.save();
		res.json(todo);
	} catch (error) {
		res.status(500).json({ message: "Failed to create a new task" });
	}
};

const deleteTodo = async (req, res) => {
	const taskId = req.params.id;
	const userId = req.user;

	try {
		const result = await Todo.findOneAndDelete({
			_id: taskId,
			user: userId,
		});
		if (!result) {
			return res
				.status(404)
				.json({ message: "Task not found or unauthorized" });
		}
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: "Failed to delete the task" });
	}
};

const updateTodo = async (req, res) => {
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
};

module.exports = {
	getAllTodos,
	createNewTodo,
	deleteTodo,
	updateTodo,
};
