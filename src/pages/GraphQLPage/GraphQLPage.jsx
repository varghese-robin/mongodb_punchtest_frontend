/** @format */

import React, { useEffect, useState } from "react";
import classes from "./GraphQLPage.module.css";

import axios from "../../utils/axios";

import useGqlQuery from "../../customHooks/useGqlQuery";
import QueryResults from "../../components/QueryResults/QueryResults";

const GraphQLPage = () => {
	const [fields, setFields] = useState([]);
	const [gqlQueryString, setGqlQueryString] = useState("");

	useEffect(() => {
		const fetchFields = async () => {
			const request = await axios.get("/get-fields");

			console.log(request.data);
			setFields(request.data);
		};

		fetchFields();
	}, []);

	const GqlQueryHandler = async (event) => {
		event.preventDefault();

		console.log("Form submitted!!!");

		const querySelectString = document.getElementById("querySelect").value;

		const queryString = document.getElementById("queryString").value;

		const selected = document.querySelectorAll(
			"#projectedFields option:checked",
		);
		const values = Array.from(selected).map((el) => el.value);

		const projectedFields = values.join("\n");
		console.log("Projected Field - ", projectedFields);

		const getData_string = `query {payments(query: { ${querySelectString}: "${queryString}" }) { ${projectedFields}}}`;

		console.log("getdatastring - ", getData_string);

		setGqlQueryString(getData_string);
	};

	return (
		<div className={classes.gql_page}>
			<div className={classes.gqlInterface}>
				<form className={classes.graphql_form} onSubmit={GqlQueryHandler}>
					<label htmlFor='querySelect'>Query Field</label>
					<select id='querySelect' className={classes.querySelect}>
						<option key='default' value='default'>
							---
						</option>
						{fields.map((field) => (
							<option key={field} value={field}>
								{field}
							</option>
						))}
					</select>
					<label htmlFor='queryString'>Query String</label>
					<input id='queryString' type='text' className={classes.queryString} />
					<label htmlFor='projectedFields'>Projected Fields</label>
					<select
						id='projectedFields'
						className={classes.projectedFields}
						multiple
					>
						<option key='default' value='default'>
							---
						</option>
						{fields.map((field) => (
							<option key={field} value={field}>
								{field}
							</option>
						))}
					</select>

					<button className={classes.submit}>Find Document(s)</button>
				</form>
			</div>
			<div className={classes.gql_results}>
				<h2>Result(s)</h2>

				{gqlQueryString && <QueryResults queryString={gqlQueryString} />}
			</div>
		</div>
	);
};

export default GraphQLPage;
