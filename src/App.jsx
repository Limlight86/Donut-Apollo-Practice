import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

const App = () => {
  <ApolloProvider>
    <h1>Hello World of Donuts</h1>
  </ApolloProvider>;
};

ReactDOM.render(<App />, document.querySelector("#root"));
