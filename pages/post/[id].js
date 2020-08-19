import React, { useContext, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import moment from "moment";

import Layout from "../../Components/layout/layout";
import PostCardContainer from "../../Components/UI/postCardContainer";
import CommentCardContainer from "../../Components/layout/commentCard";

import PageLikeButton from "../../Components/layout/PageLikeButton";
import NewCommentForm from "../../Components/layout/newComment";

import AuthContext from "../../context/auth/authContext";
import PostsContext from "../../context/post/postContext";

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
    @media (max-width: 425px) {
      display: inline-block;
    }
  }
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 0;
  margin-top: 1.5rem;
  padding: 0;
`;

//Comments and Likes
const CommentTitleContainer = styled.div`
  min-width: 300px;
  max-width: 800px;
  width: 95%;
  display: flex;
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

const CardUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  max-width: 100px;
  margin: 0;
  padding: 0;
`;

const CardUserName = styled.p`
  text-align: center;
  align-self: center;
  font-weight: bold;
  font-size: 1.8rem;
  width: 100%;
  position: relative;
  left: 30%;
  margin: 0 auto;
  color: #1457ff;
`;

const DeleteButton = styled.h2`
  width: 30%;
  text-align: center;
  background-color: red;
  color: white;
  margin: 1rem auto;
  border-radius: 0.7rem;
  cursor: pointer;

  @media (max-width: 500px) {
    width: 35%;
  }
  @media (max-width: 400px) {
    width: 40%;
  }
  @media (max-width: 320px) {
    width: 45%;
  }
`;

const Post = () => {
  //Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id: postId },
  } = router;

  //Authorization Context
  const { user } = useContext(AuthContext);

  //Posts Context / Function for delete Post
  const { DeletePost } = useContext(PostsContext);

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

  if (error) {
    return (
      <Layout>
        <h1>Error: {error.message}</h1>
      </Layout>
    );
  }

  if (!data)
    return (
      <Layout>
        <h1>Post Not Found</h1>
      </Layout>
    );
  const {
    id,
    body,
    username,
    createAt,
    commentCount,
    likeCount,
    likes,
    comments,
  } = data.getPost;

  const LikeInfo = { id, likes, likeCount };

  const DeletePostAlert = () => {
    Swal.fire({
      title: "<h2>Are you sure?</h2>",
      html: "<h2>You won't be able to revert this!</h2>",
      icon: "warning",
      width: "40rem",
      padding: "5rem",
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "Alert-Button",
      cancelButtonText: "Cancel",
      cancelButtonClass: "Alert-Button-Cancel",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "<h2>Deleted</h2>",
          html: "<h2>Your Post has been deleted.</h2>",
          icon: "success",
          width: "30rem",
          padding: "1rem",
          buttonsStyling: false,
          confirmButtonClass: "Alert-Button",
          confirmButtonText: "OK",
        });
        DeletePost(id);
        Router.push("/");
      }
    });
  };

  return (
    <Layout>
      {error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <>
          <PostCardContainer>
            <CommentCard>
              <CommentCardContent>
                <div>
                  <CardUserInfo>
                    <CardImage src="/avatar.svg" alt="Avatar Image" />
                    <CardUserName>{username}</CardUserName>
                  </CardUserInfo>

                  <p
                    css={css`
                      padding: 1rem 1rem 0 1rem;
                      @media (max-width: 425px) {
                        padding: 1rem;
                      }
                    `}
                  >
                    {body}
                  </p>
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
            <CommentTitleContainer>
              <div
                css={css`
                  width: 80%;
                  align-items: flex-start;
                `}
              >
                <h2>Comments: </h2>
              </div>
              <PageLikeButton post={LikeInfo} />
            </CommentTitleContainer>
            <CommentContainer>
              {user && <NewCommentForm postId={id} />}

              {commentCount > 0 ? (
                comments.map((comment) => {
                  return (
                    <CommentCardContainer
                      key={comment.id}
                      comment={comment}
                      actualUser={user}
                    />
                  );
                })
              ) : (
                <h2>No Comments</h2>
              )}
            </CommentContainer>
          </PostCardContainer>
          {user && user.username === username && (
            <DeleteButton onClick={DeletePostAlert}>Delete Post</DeleteButton>
          )}
        </>
      )}
    </Layout>
  );
};

export default Post;
