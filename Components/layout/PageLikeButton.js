import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";

import { css } from "@emotion/core";
import styled from "@emotion/styled";

import AuthContext from "../../context/auth/authContext";

import { LIKE_POST_MUTATION } from "../../util/graphql";

const LikeBox = styled.div`
  margin: auto;
  background-color: #ffffff;
  padding: 0 3rem;
  border-radius: 2rem;
  cursor: pointer;
`;

const HeartImg = styled.img`
  margin: 1rem 0 0 0;
  padding: 0;
  width: 30px;
`;

const LikeButton = ({ post: { id, likes, likeCount } }) => {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
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
    liked ? (
      <LikeBox onClick={likePost}>
        <HeartImg src="/complete-heart.svg" alt="Heart Image" />
        <h3
          css={css`
            margin: 0 0 1rem 0;
            padding: 0;
            font-weight: lighter;
          `}
        >
          {likeCountState}
        </h3>
      </LikeBox>
    ) : (
      <LikeBox onClick={likePost}>
        <HeartImg src="/heart.svg" alt="Heart Image" />
        <h3
          css={css`
            margin: 0 0 1rem 0;
            padding: 0;
            font-weight: lighter;
          `}
        >
          {likeCountState}
        </h3>
      </LikeBox>
    )
  ) : (
    <Link href="/login">
      <LikeBox>
        <HeartImg src="/heart.svg" alt="Heart Image" />
        <h3
          css={css`
            margin: 0 0 1rem 0;
            padding: 0;
            font-weight: lighter;
          `}
        >
          {likeCountState}
        </h3>
      </LikeBox>
    </Link>
  );

  return LikeButtonContent;
};

export default LikeButton;
