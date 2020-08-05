import React from "react";
import Link from "next/link";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import moment from "moment";

const CommentCard = styled.div`
  min-width: 400px;
  max-width: 600px;
  width: 15%;
  height: 100%;
  margin: 30px auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 10px 10px 30px #0000001e;
  box-shadow: 10px 10px 30px #0000001e;
  border-radius: 1rem;
  padding: 1.5rem 1rem 1rem 1rem;
  background-color: #ffffff;
`;
const CommentCardContent = styled.div`
  width: 100%;
  text-align: center;
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
  margin: 0 0.5rem;
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

const CardUser = styled.p`
  margin-right: auto;
  margin-bottom: 0;
  width: 90%;
  color: #1457ff;
  font-weight: bold;
`;

const CardImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: auto;
  display: inline-flex;
  align-self: left;
  margin: auto 1rem;
  top: 50%;
`;

const PostCard = ({
  post: { id, body, username, createAt, commentCount, likeCount },
}) => {
  const CommentOnPost = () => {
    console.log("Comment");
  };

  const LikePost = () => {
    console.log("Like");
  };

  return (
    <CommentCard>
      <CommentCardContent>
        <div>
          <CardImage src="/avatar.svg" alt="Avatar Image" />
          <Link href="/post/[id]" as={`/post/${id}`}>
            <p
              css={css`
                padding: 1rem 1rem 0 1rem;
                cursor: pointer;
              `}
            >
              {body}
            </p>
          </Link>
        </div>
        <CardUser>{username}</CardUser>
        <div
          css={css`
            margin-left: auto;
            margin-bottom: 0.5rem;
            width: 70%;
          `}
        >
          <Button onClick={CommentOnPost}>Comments {commentCount}</Button>
          <Button onClick={LikePost}>Likes {likeCount}</Button>
        </div>
        <p
          css={css`
            margin-top: 1rem;
            font-weight: lighter;
            font-size: 1rem;
          `}
        >
          {moment(createAt).fromNow()}
        </p>
      </CommentCardContent>
    </CommentCard>
  );
};

export default PostCard;
