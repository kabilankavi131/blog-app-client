import React from "react";
import { useLottie } from "lottie-react";
import LikeIcon from "./heartLoader.json";
import styled from "styled-components";

const LikeLottie = () => {
  const options = {
    animationData: LikeIcon,
    loop: true,
  };

  const { View } = useLottie(options);

  return <Container>{View}</Container>;
};

export default LikeLottie;

const Container = styled.div`
  width: 20%;
  position: absolute;
  left: -3%;
  display: block;
  @media (min-width: 300px) and (max-width: 800px) {
    width: 50%;
    left: -10%;
  }
`;
