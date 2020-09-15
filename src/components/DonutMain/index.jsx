import React, { useContext } from "react";
import { SanityContext, VoteContext } from "../../context";
import { SingleDonut } from "../";
import { MainWrapper } from "./styled";

const DonutMain = () => {
  const { donutData, altImage } = useContext(SanityContext);
  const { voteData, handleVote } = useContext(VoteContext);

  return (
    <MainWrapper>
      {donutData.data?.Section.options.map((donut) => (
        <SingleDonut
          key={donut._id}
          image={donut.image?.asset?.url || altImage}
          name={donut.name.en}
          votes={
            voteData.data.votes.filter((vote) => vote.donut === donut._id).length
          }
          handleClick={() => handleVote(donut._id)}
        />
      ))}
    </MainWrapper>
  );
};

export default DonutMain;
