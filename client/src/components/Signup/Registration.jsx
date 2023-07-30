import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./registration.module.css";

const api_base = "http://localhost:3000";

const Registration = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(api_base + "/users/register", {
				username,
				email,
				password,
			});

			console.log("User registered successfully:", response.data);
			setError("");
		} catch (error) {
			setError("Username or email already exists");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<h1 className={styles.description}>Tasky</h1>
			</div>
			<div className={styles.right}>
				<form className={styles.form} onSubmit={handleRegister}>
					<h1>Sign up to Tasky</h1>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className={styles.input}
					/>
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
					<button type="submit" className={styles.signup_btn}>
						Sign Up
					</button>
				</form>
				<div className={styles.login}>
					<p className={styles.existing_account}>Have an account already?&nbsp;</p>
					<Link to="/login" className={styles.login_link}>
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Registration;
