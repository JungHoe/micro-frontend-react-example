import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  color: white;
  border-left: 3px solid pink;
  line-height: 49px;
  padding-left: 30px;
  height: 100%;
`;
function index(props) {
  return <StyledHeader>This is core header</StyledHeader>;
}

index.propTypes = {};

export default index;
