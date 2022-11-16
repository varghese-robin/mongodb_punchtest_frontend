/** @format */

import React from "react";

import classes from "./NavbarItem.module.css";

import { Link } from "react-router-dom";

interface NavbarItemProp {
	item: string;
	endpoint: string;
}

const NavbarItem: React.FC<NavbarItemProp> = ({ item, endpoint }) => {
	return (
		<Link className={classes.navbar_item} to={endpoint}>
			<p>{item}</p>
		</Link>
	);
};

export default NavbarItem;
