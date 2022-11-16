/** @format */

import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";

import { Routes, Route } from "react-router-dom";
import Payments from "./pages/Payments/Payments";
import Receipt from "./pages/Receipt/Receipt";
import GraphqlProvider from "./components/GraphqlProvider/GraphqlProvider";
import MongoContextProvider from "./context/MongoContextProvider";
import GraphQLPage from "./pages/GraphQLPage/GraphQLPage";

function App() {
	return (
		<MongoContextProvider>
			<GraphqlProvider>
				<Header />
				<NavBar />
				<Routes>
					<Route path='/payment' element={<Payments />} />
					<Route path='/receipt' element={<Receipt />} />
					<Route path='/gql' element={<GraphQLPage />} />
				</Routes>
			</GraphqlProvider>
		</MongoContextProvider>
	);
}

export default App;
