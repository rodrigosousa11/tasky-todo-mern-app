import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Tasks from "./components/Tasks/Tasks";
import Registration from "./components/Signup/Registration";
import Login from "./components/Login/Login";

function App() {
	const [authenticated, setAuthenticated] = useState(false);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						authenticated ? (
							<Tasks />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>
				<Route
					path="/login"
					element={<Login setAuthenticated={setAuthenticated} />}
				/>
				<Route path="/register" element={<Registration />} />
				<Route path="*" element={<Navigate to="/register" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
