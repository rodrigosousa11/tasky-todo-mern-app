const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const existingUser = await User.findOne({
			$or: [{ username }, { email }],
		});
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Username or email already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ message: "Registration failed" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid password" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT, {
			expiresIn: "30d",
		});

		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Login failed" });
	}
});

module.exports = router;
