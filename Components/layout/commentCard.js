import React from "react";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import moment from "moment";

const CommentContent = styled.div`
  width: 100%;
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

const CommentCardContainer = ({ comment }) => {
  const { body, username, createAt } = comment;
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
