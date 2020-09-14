import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const SANITY_URL =
  "https://czqk28jt.api.sanity.io/v1/graphql/prod_th/default";

const DONUTS_QUERY = gql`
  query Donuts {
    Section(id: "section_7470") {
      options {
        ... on Item {
          _id
          name {
            en
          }
          image {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: SANITY_URL,
  cache: new InMemoryCache(),
});

export default client;
