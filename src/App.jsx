import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./data/Sanity";
import { SanityContextProvider, VoteContextProvider } from "./context";
import { Header, DonutMain } from "./components";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => (
  <ApolloProvider client={client}>
    <SanityContextProvider>
      <VoteContextProvider>
        <Header />
        <DonutMain />
        <GlobalStyles />
      </VoteContextProvider>
    </SanityContextProvider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.querySelector("#root"));
