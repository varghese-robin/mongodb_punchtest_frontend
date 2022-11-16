/** @format */

import React from "react";

import classes from "./Header.module.css";

const Header = () => {
	return (
		<div className={classes.header}>
			<img src={require("../../assets/mongo_logo.jpeg")} alt='MongoDB Logo' />
			<p>Shop</p>
		</div>
	);
};

export default Header;
