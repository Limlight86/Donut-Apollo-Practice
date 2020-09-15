import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const GRAPHQL_URL = "/graphql";

export const VOTE_QUERY = gql`
  query GetVotes {
    votes {
      id
      donut
      voter
    }
  }
`;

export const VOTE_MUTATION = gql`
  mutation CastVote($donut: String!, $voter: String!) {
    recordVote(donut: $donut, voter: $voter) {
      id
      donut
      voter
    }
  }
`;

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
