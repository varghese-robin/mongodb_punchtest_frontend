/** @format */

import React from "react";

const MongoStoreContext = React.createContext({
	mongodbId: "",
	setMongodbId: (id) => {},
});

export default MongoStoreContext;
