import React from "react";
import { useLottie } from "lottie-react";
import SearchBlogIcon from "./searchBlog.json";
import styled from "styled-components";

const SearchBlogLottie = () => {
  const options = {
    animationData: SearchBlogIcon,
    loop: true,
  };

  const { View } = useLottie(options);

  return <Container>{View}</Container>;
};

export default SearchBlogLottie;

const Container = styled.div`
  width: 30%;
  position: absolute;
  left: 50%;
  top: -50%;
  margin: 0 auto;
  z-index: 2000;
  @media (min-width: 300px) and (max-width: 800px) {
    top: -25%;
  }
`;
