/** @format */

import React from "react";

import classes from "./NavBar.module.css";
import NavbarItem from "./NavbarItem/NavbarItem";

const NavBar = () => {
	return (
		<div className={classes.navbar}>
			<NavbarItem item='Payment' endpoint='payment' />
			<NavbarItem item='Receipt' endpoint='receipt' />
			<NavbarItem item='GraphQL Interface' endpoint='gql' />
		</div>
	);
};

export default NavBar;
