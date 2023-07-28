const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch(console.error);

app.get("/todos", async (req, res) => {
	const todos = await Todo.find();
	res.json(todos);
});

app.post("/todo/new", (req, res) => {
	const todo = new Todo({
		title: req.body.title,
	});
	todo.save();
	res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);
	res.json(result);
});

app.put("/todo/update/:id", async (req, res) => {
	const todo = await Todo.findByIdAndUpdate(req.params.id);

	todo.completed = !todo.completed;
	todo.save();
	res.json(todo);
});

app.listen(3000, () => console.log("Server started on port 3000"));