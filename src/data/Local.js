import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const GRAPHQL_URL = "/graphql";

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
