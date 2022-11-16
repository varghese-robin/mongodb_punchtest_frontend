/** @format */

import React from "react";

import classes from "./QueryResult.module.css";

const QueryResult = (props) => {
	const key_fields = Object.keys(props.result);
	return (
		<div>
			<ul className={classes.query_result_box}>
				{key_fields
					.filter((key_field) => key_field !== "__typename")
					.map((key_field) => {
						return (
							<li>
								<strong>{key_field}: </strong>
								{props.result[key_field]}
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default QueryResult;
