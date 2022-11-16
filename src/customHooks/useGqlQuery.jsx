/** @format */

import React from "react";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const useGqlQuery = (data_string) => {
	const GET_DATA = gql`
		${data_string}
	`;

	const { loading, error, data } = useQuery(GET_DATA);

	if (loading) {
		console.log("loading....");
	}

	if (error) {
		console.log(`encountered an error: ${error}`);
	}

	if (data) {
		// setPaymentData((prevState) => {
		// 	return { ...prevState, ...data };
		// });
		console.log("GQL Data Computed - ", data);
	}

	return data;
};

export default useGqlQuery;
