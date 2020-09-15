import React from "react";
import { DonutWrapper, DonutImage, VoteButton } from "./styled";

const SingleDonut = ({ image, name, votes, handleClick }) => (
  <DonutWrapper>
    <DonutImage src={image} alt={name} />
    <h2>{votes}</h2>
    <VoteButton onClick={handleClick}>{name}</VoteButton>
  </DonutWrapper>
);

export default SingleDonut;
