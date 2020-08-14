import React from "react";
import Link from "next/link";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import moment from "moment";

const CommentCard = styled.div`
  min-width: 290px;
  max-width: 400px;
  width: 95%;
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
  }
`;

const Button = styled.a`
  display: flex;
  font-weight: 700;
  padding: 0.5rem 0;
  margin: 0;
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

const CardUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  margin: 0;
  padding: 0;
`;

const CardUserName = styled.p`
  text-align: center;
  align-self: center;
  font-weight: bold;
  font-size: 1.8rem;
  color: #1457ff;
`;

const CardImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 0;
  margin-top: 1.5rem;
  padding: 0;
`;

const CardBody = styled.p`
  padding: 1rem;
  cursor: pointer;
  width: 86%;
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
        <div
          css={css`
            width: 100%;
            padding-left: 1rem;
          `}
        >
          <CardUserInfo>
            <CardImage src="/avatar.svg" alt="Avatar Image" />
            <CardUserName>{username}</CardUserName>
          </CardUserInfo>
          <Link href="/post/[id]" as={`/post/${id}`}>
            <CardBody>{body}</CardBody>
          </Link>
        </div>
        <div
          css={css`
            margin-left: auto;
            margin-bottom: 0.5rem;
            width: 70%;
          `}
        >
          <Link href="/post/[id]" as={`/post/${id}`}>
            <Button>
              <img
                src="/comment.svg"
                css={css`
                  width: 25px;
                  padding-top: 3px;
                  margin-right: 1rem;
                `}
              />{" "}
              {commentCount}
            </Button>
          </Link>

          <Button onClick={LikePost}>
            <img
              src="/heart.svg"
              css={css`
                width: 25px;
                margin-right: 1rem;
              `}
            />{" "}
            {likeCount}
          </Button>
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
