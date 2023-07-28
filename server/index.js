const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/users");

app.use(express.json());
app.use(cors());

mongoose
	.connect(process.env.MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch(console.error);

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));