import React from "react";
import { useLottie } from "lottie-react";
import FourNotFourIcon from "../components/Lottie Files/fournotfour.json";
import styled from "styled-components";

const FourNotFour = () => {
  const options = {
    animationData: FourNotFourIcon,
    loop: true,
  };

  const { View } = useLottie(options);

  return <Container>{View}</Container>;
};

export default FourNotFour;

const Container = styled.div`
  width: 60%;
  margin: 3% 20%;
`;
