import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";

const api_base = "http://localhost:3000";

const Login = ({ setAuthenticated }) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(api_base + "/users/login", {
				username,
				password,
			});
			const data = response.data;

			if (data.token) {
				setError("");
				setAuthenticated(true);
				localStorage.setItem("token", data.token);
				navigate("/");
			} else {
				setError("Invalid username or password");
			}
		} catch (error) {
			setError("Invalid username or password");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<h1 className={styles.description}>Tasky</h1>
			</div>
			<div className={styles.right}>
				<form className={styles.form} onSubmit={handleLogin}>
					<h1 className={styles.label}> Sign in to Tasky</h1>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className={styles.input}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className={styles.input}
					/>
					{error && <div className={styles.error_msg}>{error}</div>}
					<button type="submit" className={styles.login_btn}>
						Sign In
					</button>
				</form>
				<div className={styles.signup}>
					<p className={styles.new_here_text}>New here?&nbsp;</p>
					<Link to="/register" className={styles.signup_link}>
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
