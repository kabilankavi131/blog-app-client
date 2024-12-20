import { useLottie } from "lottie-react";
import startLoading from "./startLoading.json";
import styled from "styled-components";

const StartLoading = () => {
  const options = {
    animationData: startLoading,
    loop: true,
  };

  const { View } = useLottie(options);

  return <Container>{View}</Container>;
};

export default StartLoading;

const Container = styled.div`
  height: 100px;
  width: 30%;
  position: relative;
  margin: 0 auto;
`;
