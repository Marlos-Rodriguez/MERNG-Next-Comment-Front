import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import moment from "moment";

import Layout from "../../Components/layout/layout";
import PostCardContainer from "../../Components/UI/postCardContainer";
import CommentCardContainer from "../../Components/layout/commentCard";

import { FETCH_POST_QUERY } from "../../util/graphql";

const CommentCard = styled.div`
  min-width: 280px;
  max-width: 800px;
  width: 95%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 10px 10px 30px #0000001e;
  box-shadow: 10px 10px 30px #0000001e;
  border-radius: 1rem;
  padding: 1.5rem 1rem 1rem 1rem;
  background-color: #ffffff;
  margin-bottom: 3rem;
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

const CardUser = styled.p`
  margin-right: auto;
  margin-bottom: 0;
  width: 89%;
  color: #1457ff;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 85%;
  }
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: auto;
  display: inline-flex;
  align-self: left;
  margin: auto 1rem;
  top: 50%;
`;

//Comments and Likes
const CommentTitleContainer = styled.div`
  min-width: 300px;
  max-width: 800px;
  width: 95%;
  display: flex;
`;

const LikeBox = styled.div`
  margin: auto;
  background-color: #ffffff;
  padding: 0 3rem;
  border-radius: 2rem;
`;

const HeartImg = styled.img`
  margin: 1rem 0 0 0;
  padding: 0;
  width: 30px;
`;

const CommentContainer = styled.div`
  min-width: 300px;
  max-width: 700px;
  width: 70%;
  position: relative;
  padding: 2rem;
  right: 14%;
  @media (max-width: 1024px) {
    right: 7%;
  }
  @media (max-width: 768px) {
    right: 10%;
  }
  @media (max-width: 375px) {
    right: 0;
  }
`;

const Post = () => {
  //Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id: postId },
  } = router;

  const { loading, data, error } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  if (loading)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  const {
    body,
    username,
    createAt,
    commentCount,
    likeCount,
    comments,
  } = data.getPost;

  const CommentOnPost = () => {
    console.log("Comment");
  };

  const LikePost = () => {
    console.log("Like");
  };

  return (
    <Layout>
      {error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <PostCardContainer>
          <CommentCard>
            <CommentCardContent>
              <div>
                <CardImage src="/avatar.svg" alt="Avatar Image" />

                <p
                  css={css`
                    padding: 1rem 1rem 0 1rem;
                  `}
                >
                  {body}
                </p>
              </div>
              <CardUser>{username}</CardUser>

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
          <CommentTitleContainer>
            <div
              css={css`
                width: 80%;
                align-items: flex-start;
              `}
            >
              <h2>Comments: </h2>
            </div>
            <LikeBox>
              <HeartImg src="/heart.svg" alt="Heart Image" />
              <h3
                css={css`
                  margin: 0 0 1rem 0;
                  padding: 0;
                  font-weight: lighter;
                `}
              >
                {likeCount}
              </h3>
            </LikeBox>
          </CommentTitleContainer>
          <CommentContainer>
            {commentCount > 0 ? (
              comments.map((comment) => {
                return (
                  <CommentCardContainer key={comment.id} comment={comment} />
                );
              })
            ) : (
              <h2>No Comments</h2>
            )}
          </CommentContainer>
        </PostCardContainer>
      )}
    </Layout>
  );
};

export default Post;
