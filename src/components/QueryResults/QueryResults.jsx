/** @format */

import React, { useState } from "react";

import classes from "./QueryResults.module.css";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import QueryResult from "./QueryResult/QueryResult";

const QueryResults = (props) => {
	const [queryData, setQueryData] = useState([]);
	const [queryDataReceived, setQueryDataReceived] = useState(false);

	const GET_DATA = gql`
		${props.queryString}
	`;

	const { loading, error, data } = useQuery(GET_DATA);

	if (loading) return <div className={classes.loading}>Loading....</div>;

	if (error) {
		console.log(`encountered an error: ${error}`);
	}

	if (data) {
		// setPaymentData((prevState) => {
		// 	return { ...prevState, ...data };
		// });
		if (!queryDataReceived) {
			setQueryData(data.payments);
			setQueryDataReceived(true);
		}
	}
	console.log("GQL Data Computed - ", queryData);
	return (
		<div className={classes.query_results}>
			{queryDataReceived && queryData.length && (
				<ul className={classes.query_results_box}>
					{queryData.map((result, index) => {
						return (
							<li key={index}>
								<QueryResult key={index} result={result} />
							</li>
						);
					})}
				</ul>
			)}
			{!queryData.length && (
				<h2 className={classes.query_results_box}>No data found</h2>
			)}
		</div>
	);
};

export default QueryResults;
