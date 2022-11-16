/** @format */

import React from "react";

import * as Realm from "realm-web";
import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";

const APP_ID = "graphql_service-nbseo";

const app = new Realm.App(APP_ID);

async function getValidAccessToken() {
	// Guarantee that there's a logged in user with a valid access token
	if (!app.currentUser) {
		// If no user is logged in, log in an anonymous user. The logged in user will have a valid
		// access token.
		await app.logIn(Realm.Credentials.anonymous());
	} else {
		// An already logged in user's access token might be stale. Tokens must be refreshed after
		// 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
		await app.currentUser.refreshAccessToken();
	}
	return app.currentUser.accessToken;
}

const client = new ApolloClient({
	link: new HttpLink({
		uri: `https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/graphql_service-nbseo/graphql`,
		// We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
		// The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
		// access token before sending the request.
		fetch: async (uri, options) => {
			const accessToken = await getValidAccessToken();
			options.headers.Authorization = `Bearer ${accessToken}`;
			return fetch(uri, options);
		},
	}),
	cache: new InMemoryCache(),
});

const GraphqlProvider = (props) => {
	return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
export default GraphqlProvider;
