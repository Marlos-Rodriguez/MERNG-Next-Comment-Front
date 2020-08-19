import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";

import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { LIKE_POST_MUTATION } from "../../util/graphql";

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

const HeartImage = styled.img`
  width: 25px;
  padding-top: 3px;
  margin-right: 1rem;
`;

const LikeButton = ({ user, post: { id, username, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);

  useEffect(() => {
    if (user && likes) {
      if (user && likes.find((like) => like.username === user.username)) {
        setLiked(true);
      } else setLiked(false);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    update(_, { data: likePost }) {
      if (
        user &&
        likePost.likePost.likes.find((like) => like.username === user.username)
      ) {
        setLiked(true);
      } else setLiked(false);

      setLikeCountState(likePost.likePost.likeCount);
    },
    variables: { postId: id },
  });

  const LikeButtonContent = user ? (
    user.username === username ? (
      liked ? (
        <Button onClick={likePost}>
          <HeartImage src="/complete-heart.svg" />
          <p
            css={css`
              position: relative;
              top: 18%;
            `}
          >
            {likeCountState}
          </p>
        </Button>
      ) : (
        <Button onClick={likePost}>
          <HeartImage src="/heart.svg" />
          <p
            css={css`
              position: relative;
              top: 18%;
            `}
          >
            {likeCountState}
          </p>
        </Button>
      )
    ) : liked ? (
      <Button onClick={likePost}>
        <HeartImage src="/complete-heart.svg" />
        {likeCountState}
      </Button>
    ) : (
      <Button onClick={likePost}>
        <HeartImage src="/heart.svg" />
        {likeCountState}
      </Button>
    )
  ) : (
    <Link href="/login">
      <Button>
        <HeartImage src="/heart.svg" />
        {likeCountState}
      </Button>
    </Link>
  );

  return LikeButtonContent;
};

export default LikeButton;
