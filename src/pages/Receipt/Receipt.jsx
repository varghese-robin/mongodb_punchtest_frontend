/** @format */

import React, { useContext, useEffect, useState } from "react";
import classes from "./Receipt.module.css";

import axios from "../../utils/axios";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import MongoStoreContext from "../../context/mongoStoreContext";

const Receipt = () => {
	const [id, setId] = useState("");
	const [receiptDataReceived, setReceiptDataReceived] = useState(false);
	const [receiptData, setReceiptData] = useState({});
	const mongoCtx = useContext(MongoStoreContext);

	useEffect(() => {
		const fetchObjectId = async () => {
			const request = await axios.post("/objectid", {
				mongodbId: mongoCtx.mongodbId,
			});

			setId(request.data);
		};

		fetchObjectId();
	}, []);

	const GET_DATA = gql`
			query {
				payment(query: { _id: "${id}" }) {
					_id
					amount
					currency
					customer_name
					customer_email
					payment_method
				}
			}`;

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
		if (!receiptDataReceived) {
			setReceiptData(data);
			setReceiptDataReceived(true);
		}
	}

	console.log("Receipt Data from Component - ", receiptData);
	return (
		<div className={classes.receipt_page}>
			{receiptDataReceived && (
				<div className={classes.receipt_details}>
					<div className={classes.cust_details}>
						<div className={classes.cust_name}>_id</div>:{" "}
						{receiptData.payment._id}
					</div>

					<div className={classes.cust_details}>
						<div className={classes.cust_name}>Customer Name</div>:{" "}
						{receiptData.payment.customer_name}
					</div>

					<div className={classes.cust_details}>
						<div className={classes.cust_name}>Customer Email</div>:{" "}
						{receiptData.payment.customer_email}
					</div>

					<div className={classes.cust_details}>
						<div className={classes.cust_name}>Amount</div>:{" "}
						{"£" + receiptData.payment.amount}
					</div>

					<div className={classes.cust_details}>
						<div className={classes.cust_name}>Payment Method</div>:{" "}
						{receiptData.payment.payment_method}
					</div>
				</div>
			)}
		</div>
	);
};

export default Receipt;
