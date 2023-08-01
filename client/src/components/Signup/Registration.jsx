import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./registration.module.css";

const api_base = "http://localhost:3000";

const Registration = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();

		if (password.length < 8) {
			setError("Password must be at least 8 characters!");
			return;
		}

		try {
			const response = await axios.post(api_base + "/users/register", {
				firstName,
				lastName,
				email,
				password,
			});

			console.log("User registered successfully:", response.data);
			setError("");
			navigate("/login");
		} catch (error) {
			setError("An account with this email already exists");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<p className={styles.description}>Will you forget?</p>
				<p className={styles.description}>Write it down on Tasky</p>
			</div>
			<div className={styles.right}>
				<form className={styles.form} onSubmit={handleRegister}>
					<h1 className={styles.label}>Sign up to Tasky</h1>
					<input
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						className={styles.input}
					/>
					<input
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
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
					<p className={styles.existing_account}>
						Have an account already?&nbsp;
					</p>
					<Link to="/login" className={styles.login_link}>
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Registration;
