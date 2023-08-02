import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>
                All rights reserved &copy; {new Date().getFullYear()}
			</p>
		</footer>
	);
};

export default Footer;
