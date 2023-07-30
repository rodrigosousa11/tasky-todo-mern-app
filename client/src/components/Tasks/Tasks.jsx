import React, { useEffect, useState } from "react";
import styles from "./tasks.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api_base = "http://localhost:3000";

const Tasks = () => {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		getTodos();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
		setIsLoggedIn(false);
	};

	const getTodos = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(api_base + "/todos/all", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = response.data;
			setTodos(data);
		} catch (error) {
			console.error("Error: ", error);
		}
	};

	const addTodo = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				api_base + "/todos/new",
				{
					title: newTodo,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = response.data;

			setTodos([...todos, data]);
			setPopupActive(false);
			setNewTodo("");
		} catch (error) {
			console.error("Error: ", error);
		}
	};

	const completeTodo = async (id) => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.put(
				api_base + `/todos/update/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = response.data;

			setTodos((todos) =>
				todos.map((todo) => {
					if (todo._id === data._id) {
						todo.completed = data.completed;
					}
					return todo;
				})
			);
		} catch (error) {
			console.error("Error: ", error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const token = localStorage.getItem("token");
			await axios.delete(api_base + `/todos/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTodos((todos) => todos.filter((todo) => todo._id !== id));
		} catch (error) {
			console.error("Error: ", error);
		}
	};

	return (
		<div className={styles["tasks-page"]}>
			<div className={styles["leave-container"]}>
				<MdLogout onClick={handleLogout} />
			</div>
			<h1>Welcome, Rodrigo</h1>
			<h4>Your tasks</h4>
			<div className={styles["todos"]}>
				{todos.length > 0 ? (
					todos.map((todo) => (
						<div
							className={`${styles["todo"]} ${
								todo.completed ? styles["is-complete"] : ""
							}`}
							key={todo._id}
							onClick={() => completeTodo(todo._id)}
						>
							<div className={styles["checkbox"]}></div>
							<div className={styles["text"]}>{todo.title}</div>
							<div
								className={styles["delete-todo"]}
								onClick={() => deleteTodo(todo._id)}
							>
								<RiDeleteBin2Fill />
							</div>
						</div>
					))
				) : (
					<p>You have no tasks yet</p>
				)}
			</div>
			<div
				className={styles["addPopup"]}
				onClick={() => setPopupActive(true)}
			>
				<IoAddCircle />
			</div>
			{popupActive ? (
				<div className={styles["pop-container"]}>
					<div className={styles["popup"]}>
						<div
							className={styles["closePopup"]}
							onClick={() => setPopupActive(false)}
						>
							<AiFillCloseCircle />
						</div>
						<div className={styles["content"]}>
							<h3>Add Task</h3>
							<input
								type="text"
								className={styles["add-todo-input"]}
								onChange={(e) => setNewTodo(e.target.value)}
								value={newTodo}
							/>
							<div className={styles["button"]} onClick={addTodo}>
								Add
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Tasks;
