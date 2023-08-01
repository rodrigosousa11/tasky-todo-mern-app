const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const todoController = require("../controllers/todoController");

router.get("/all", authenticateToken, todoController.getAllTodos);
router.post("/new", authenticateToken, todoController.createNewTodo);
router.delete("/delete/:id", authenticateToken, todoController.deleteTodo);
router.put("/update/:id", authenticateToken, todoController.updateTodo);

module.exports = router;
