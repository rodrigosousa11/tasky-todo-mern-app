import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";

const api_base = "http://localhost:3000";

const Login = ({ setAuthenticated }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(api_base + "/users/login", {
				email,
				password,
			});
			const data = response.data;

			if (data) {
				setError("");
				setAuthenticated(true);
				localStorage.setItem("token", data);
				navigate("/");
			} else {
				setError("Invalid email or password");
			}
		} catch (error) {
			setError("Invalid email or password");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<p className={styles.description}>Will you forget?</p>
				<p className={styles.description}>Write it down on Tasky</p>
			</div>
			<div className={styles.right}>
				<form className={styles.form} onSubmit={handleLogin}>
					<h1 className={styles.label}>Sign in to Tasky</h1>
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)} 
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
