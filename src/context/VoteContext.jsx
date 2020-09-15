import React, { createContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import client, { VOTE_QUERY, VOTE_MUTATION } from "../data/Local";

const VoteContext = createContext();

const VoteContextProvider = ({ children }) => {
  const [voter, setVoter] = useState(localStorage.getItem("voterId"))
  const voteData = useQuery(VOTE_QUERY, { client });
  const [recordVote] = useMutation(VOTE_MUTATION, { client });

  useEffect(()=>{
    if (!localStorage.getItem("voterId")) {
      localStorage.setItem("voterId", String(Math.random()));
      setVoter(localStorage.getItem("voterId"))
    }
  }, [])

  const handleVote = (donut) => {
    recordVote({
      variables: {
        donut,
        voter,
      },
      refetchQueries: [{ query: VOTE_QUERY }],
    });
  };

  return (
    <VoteContext.Provider value={{ voteData, handleVote }}>
      {children}
    </VoteContext.Provider>
  );
};

export { VoteContext, VoteContextProvider };
