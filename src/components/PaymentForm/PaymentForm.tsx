/** @format */

import React, { SyntheticEvent, useContext } from "react";
import axios from "../../utils/axios";

import { useNavigate } from "react-router-dom";

import classes from "./PaymentForm.module.css";

import MongoStoreContext from "../../context/mongoStoreContext";

const PaymentForm = () => {
	const navigate = useNavigate();
	const mongodbCtx = useContext(MongoStoreContext);
	const paymentSubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();

		const name = (document.getElementById("name") as HTMLInputElement).value;
		const email = (document.getElementById("email") as HTMLInputElement).value;

		const request = await axios.post("/payment", {
			name,
			email,
		});

		console.log(request.data);
		mongodbCtx.mongodbId = request.data.insertedId;

		navigate("/receipt");
	};
	return (
		<form onSubmit={paymentSubmitHandler} className={classes.payment_form}>
			<div className={classes.payment_name}>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name' />
			</div>
			<div className={classes.payment_email}>
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' />
			</div>
			<div className={classes.payment_card}>
				<label htmlFor='card'>Card number</label>
				<input type='card' id='card' placeholder='xxxx xxxx xxxx xxxx' />
			</div>
			<div className={classes.card_details}>
				<div className={classes.card_details_fields}>
					<label htmlFor='expiration'>Expiration</label>
					<input type='text' id='expiration' placeholder='MM / YY' />
				</div>
				<div className={classes.card_details_fields}>
					<label htmlFor='cvc'>CVC</label>
					<input type='number' id='cvc' placeholder='CVC' />
				</div>
			</div>
			<button className={classes.payment_confirm}>Confirm</button>
		</form>
	);
};

export default PaymentForm;
