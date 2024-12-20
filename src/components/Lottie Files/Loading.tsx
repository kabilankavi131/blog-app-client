import React from "react";
import { useLottie } from "lottie-react";
import LoadingIcon from "./groovyWalk.json";
import styled from "styled-components";

const Loading = () => {
  const options = {
    animationData: LoadingIcon,
    loop: true,
  };

  const { View } = useLottie(options);

  return <Container>{View}</Container>;
};

export default Loading;

const Container = styled.div`
  height: 100px;
  width: 30%;
  position: relative;
  margin: 0 auto;
`;
