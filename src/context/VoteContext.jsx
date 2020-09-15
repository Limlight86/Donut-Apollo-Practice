import React, { createContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import client, { VOTE_QUERY, VOTE_MUTATION } from "../data/Local";

const VoteContext = createContext();

const VoteContextProvider = ({ children }) => {
  const [voter, setVoter] = useState(localStorage.getItem("voterId"))
  const voteData = useQuery(VOTE_QUERY, { client });
  const [recordVote] = useMutation(VOTE_MUTATION, {
    client,
    update(cache, mutationResult) {
      const { votes } = cache.readQuery({ query: VOTE_QUERY });
      const newVote = mutationResult.data.recordVote;
      const updatedVotes = votes.filter(
        (vote) => newVote.voterId !== vote.voterId
      );
      cache.writeQuery({
        query: VOTE_QUERY,
        data: { votes: [...updatedVotes, newVote] },
      });
    },
  });

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
      optimisticResponse: {
        __typename: "Mutation",
        recordVote: {
          __typename: "Vote",
          voter,
          donut
        }
      }
    });
  };

  return (
    <VoteContext.Provider value={{ voteData, handleVote }}>
      {children}
    </VoteContext.Provider>
  );
};

export { VoteContext, VoteContextProvider };
