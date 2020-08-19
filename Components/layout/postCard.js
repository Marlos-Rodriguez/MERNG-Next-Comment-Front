import React from "react";
import Link from "next/link";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import moment from "moment";

import LinkButton from "./likeButton";

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

  &:hover {
    cursor: pointer;
  }
  &:first-of-type {
    margin-left: auto;
  }
`;

const CardUserInfo = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 50px;
  margin: 0;
  padding: 0;
  @media (max-width: 425px) {
    width: 75px;
  }
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
  margin: 0;
  margin-top: 1.5rem;
  padding: 0;
  @media (max-width: 425px) {
    width: 75px;
  }
`;

const CardBody = styled.p`
  padding: 1rem;
  cursor: pointer;
  width: 86%;
`;

const PostCard = ({
  post: { id, body, username, createAt, commentCount, likes, likeCount },
  actualUser,
}) => {
  const LikeInfo = { id, username, likes, likeCount };
  return (
    <CommentCard>
      <CommentCardContent>
        <div
          css={css`
            display: inline-flex;
            width: 100%;
            padding-left: 1rem;
            @media (max-width: 425px) {
              display: inline-block;
            }
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
            display: inline-flex;
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
              {actualUser && actualUser.username === username ? (
                <p
                  css={css`
                    position: relative;
                    top: 18%;
                  `}
                >
                  {commentCount}
                </p>
              ) : (
                commentCount
              )}
            </Button>
          </Link>
          <LinkButton user={actualUser} post={LikeInfo} />
          {actualUser && actualUser.username === username && (
            <Link href="/post/[id]" as={`/post/${id}`}>
              <Button>
                <p
                  css={css`
                    color: red;
                    font-size: 3rem;
                  `}
                >
                  {" "}
                  &#128465;
                </p>
              </Button>
            </Link>
          )}
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
