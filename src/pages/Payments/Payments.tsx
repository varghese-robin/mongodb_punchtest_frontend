/** @format */

import React from "react";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import classes from "./Payments.module.css";

const Payments = () => {
	return (
		<div className={classes.payments}>
			<div className={classes.product_container}>
				<p className={classes.product_title}>PlayStation 5 Console</p>
				<img
					src={require("../../assets/ps5.jpeg")}
					alt=''
					className={classes.product_image}
				/>
				<p className={classes.product_price}>£479.99</p>
			</div>
			<PaymentForm />
		</div>
	);
};

export default Payments;
