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
  left: -10px;
  top: 50px;
  // background: blue;
  margin: 0 auto;
  z-index: 1500;
`;
