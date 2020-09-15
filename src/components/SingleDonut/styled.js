import styled from "styled-components";

export const DonutWrapper = styled.section`
  display: grid;
  place-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 0.3rem;
  border: 0.25rem solid white;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5);

  h2 {
    color: black;
  }
`;

export const DonutImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 20rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.07);
  }
`;

export const VoteButton = styled.button`
  font-family: sofiapro;
  padding: 1rem 2rem;
  height: 4rem;
  font-size: 1.3rem;
  margin: 1rem;
  cursor: pointer;
  background-color: rgb(200, 16, 46);
  color: white;
  border: 0;
  border-radius: 10rem;

  &:hover {
    background-color: rgb(172, 12, 38);
  }
`;
