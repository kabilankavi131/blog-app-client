import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-radius: 10px;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Item = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const Favourites: React.FC = () => {
  // Sample favourites data
  const favourites = [
    "Favourite Item 1",
    "Favourite Item 2",
    "Favourite Item 3",
  ];

  return (
    <Container>
      <Title>Favourites</Title>
      {favourites.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
    </Container>
  );
};

export default Favourites;
