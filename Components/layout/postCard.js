import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const CommentCard = styled.div`
  min-width: 400px;
  max-width: 600px;
  width: 15%;
  margin: 30px auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 10px 10px 30px #0000001e;
  box-shadow: 10px 10px 30px #0000001e;
  border-radius: 1rem;
  padding: 1rem;

  &:hover {
    transform: translateY(-10px);
  }
`;
const CommentCardContent = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  p {
    text-align: left;
    margin: 0;
  }

  div {
    display: inline-flex;
    width: 100%;
  }
`;

const Button = styled.a`
  display: flex;
  font-weight: 700;
  border: 1px solid #d1d1d1;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  text-align: center;
  margin-right: 2rem;
  background-color: white;
  color: #000;
  align-self: right;

  &:hover {
    cursor: pointer;
  }
  &:first-of-type {
    margin-left: auto;
  }
`;

const PostCard = ({ post: { body, username } }) => {
  return (
    <CommentCard>
      <CommentCardContent>
        <div>
          <img
            src=""
            css={css`
              width: 50px;
              height: 50px;
              margin-right: auto;
              display: inline-flex;
              align-self: left;
              margin: auto 1rem;
              top: 50%;
            `}
          />
          <p
            css={css`
              padding: 1.6rem 1rem 0 1rem;
            `}
          >
            {body}
          </p>
        </div>
        <p
          css={css`
            margin-right: auto;
            margin-bottom: 0;
            width: 90%;
            color: #1457ff;
            font-weight: bold;
          `}
        >
          {username}
        </p>
        <div
          css={css`
            margin-left: auto;
            width: 80%;
          `}
        >
          <Button>Comments 0</Button>
          <Button>Likes 0</Button>
        </div>
      </CommentCardContent>
    </CommentCard>
  );
};

export default PostCard;
