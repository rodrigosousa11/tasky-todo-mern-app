import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import axios from "axios";

const api_base = "http://localhost:3000";

function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		axios
			.get(api_base + "/todos")
			.then((response) => setTodos(response.data))
			.catch((error) => console.error("Error: ", error));
	};

	const completeTodo = async (id) => {
		try {
			const response = await axios.put(api_base + "/todo/update/" + id);
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

	const addTodo = async () => {
		try {
			const response = await axios.post(api_base + "/todo/new", {
				title: newTodo,
			});
			const data = response.data;

			setTodos([...todos, data]);
			setPopupActive(false);
			setNewTodo("");
		} catch (error) {
			console.error("Error: ", error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(api_base + "/todo/delete/" + id);
			setTodos((todos) => todos.filter((todo) => todo._id !== id));
		} catch (error) {
			console.error("Error: ", error);
		}
	};

	return (
		<div className="App">
			<h1>Welcome, Rodrigo</h1>
			<h4>Your tasks</h4>

			<div className="todos">
				{todos.length > 0 ? (
					todos.map((todo) => (
						<div
							className={
								"todo" + (todo.completed ? " is-complete" : "")
							}
							key={todo._id}
							onClick={() => completeTodo(todo._id)}
						>
							<div className="checkbox"></div>
							<div className="text">{todo.title}</div>
							<div
								className="delete-todo"
								onClick={() => deleteTodo(todo._id)}
							>
								<AiFillCloseCircle />
							</div>
						</div>
					))
				) : (
					<p>You have no tasks yet</p>
				)}
			</div>
			<div className="addPopup" onClick={() => setPopupActive(true)}>
				<IoAddCircle />
			</div>
			{popupActive ? (
				<div className="pop-container">
					<div className="popup">
						<div
							className="closePopup"
							onClick={() => setPopupActive(false)}
						>
							<AiFillCloseCircle />
						</div>
						<div className="content">
							<h3>Add Task</h3>
							<input
								type="text"
								className="add-todo-input"
								onChange={(e) => setNewTodo(e.target.value)}
								value={newTodo}
							/>
							<div className="button" onClick={addTodo}>
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
}

export default App;
