/** @format */

import React, { useState } from "react";

import MongoStoreContext from "./mongoStoreContext";

const MongoContextProvider = (props) => {
	const [mongodbId, setMongodbId] = useState("");

	const mongodbIdHandler = (id) => {
		setMongodbId(id);
	};
	const mongodbCtx = {
		mongodbId: mongodbId,
		setMongodbId: mongodbIdHandler,
	};

	return (
		<MongoStoreContext.Provider value={mongodbCtx}>
			{props.children}
		</MongoStoreContext.Provider>
	);
};

export default MongoContextProvider;
