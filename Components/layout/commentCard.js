import React, { useContext } from "react";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import moment from "moment";

import PostContext from "../../context/post/postContext";

import AlertHook from "../../util/alertHooks";

const CommentContent = styled.div`
  width: 100%;
  max-width: 100%;
  position: relative;
  background-color: #ffffff;
  padding: 1rem 1rem 0 1rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
`;

const CommentUser = styled.p`
  width: 10%;
  position: relative;
  padding: 0;
  margin: 0;
  left: 0%;
  color: #1457ff;
  font-weight: bold;
`;

const CommentCreateAt = styled.p`
  margin-top: 1rem;
  font-weight: lighter;
  font-size: 1rem;
  padding: 0;
  margin: 0;
`;

const DeleteButton = styled.p`
  position: relative;
  text-align: center;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  color: red;
  cursor: pointer;
`;

const CommentCardContainer = ({ comment, actualUser, postId }) => {
  const { id, body, username, createAt } = comment;

  const { DeleteComment } = useContext(PostContext);

  function DelteCommentCallback() {
    const commentInfo = { postId, commentId: id };

    DeleteComment(commentInfo);
  }

  return (
    <>
      {" "}
      <CommentContent>
        <div
          css={css`
            display: flex;
          `}
        >
          <img
            src="/avatar.svg"
            alt="Avatar Comment Image"
            css={css`
              width: 50px;
            `}
          />

          <p
            css={css`
              padding: 1rem 1rem 0 1rem;
              margin: 0;
            `}
          >
            {body}
          </p>
        </div>
        <CommentUser>{username}</CommentUser>
        {actualUser && actualUser.username === username && (
          <div
            css={css`
              width: 50%;
              padding: 0;
              margin: 0 auto;
            `}
          >
            <DeleteButton onClick={() => AlertHook(DelteCommentCallback)}>
              Delete
            </DeleteButton>
          </div>
        )}

        <div
          css={css`
            width: 100%;
            padding: 0;
            margin: 0;
          `}
        >
          <CommentCreateAt>{moment(createAt).fromNow()}</CommentCreateAt>
        </div>
      </CommentContent>
    </>
  );
};

export default CommentCardContainer;
