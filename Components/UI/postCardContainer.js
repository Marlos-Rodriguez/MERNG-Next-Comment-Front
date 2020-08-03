import React from "react";
import styled from "@emotion/styled";

const CommentsContainer = styled.div`
  width: 95%;
  margin: 2rem auto 0 auto;
  padding: 30px 0;
  background-color: #f2f2f2;
`;

const Contenedor = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
`;
const Comments = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  padding: 20px 0px;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
`;

const PostCardContainer = (props) => {
  return (
    <CommentsContainer>
      <Contenedor>
        <Comments>{props.children}</Comments>
      </Contenedor>
    </CommentsContainer>
  );
};

export default PostCardContainer;
