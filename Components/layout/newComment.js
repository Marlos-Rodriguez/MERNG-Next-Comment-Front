import React, { useState, useContext } from "react";

import styled from "@emotion/styled";

import { InputSubmit } from "../UI/form";
import { useForm } from "../../util/hooks";

import { Error } from "../UI/form";

import PostsContext from "../../context/post/postContext";

const NewComment = styled.form`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 10px 10px 30px #0000001e;
  box-shadow: 10px 10px 30px #0000001e;
`;

const NewCommentTextArea = styled.textarea`
  width: 100%;
  height: 7rem;
  max-width: 90%;
  max-height: 7rem;
`;

const InputNewComment = styled(InputSubmit)`
  width: 20%;
  font-size: 1.5rem;
  text-transform: none;
  padding: 1rem 0;
  @media (max-width: 600px) {
    width: 35%;
  }
`;

const NewCommentForm = ({ postId }) => {
  const { onChange, onSubmit, values } = useForm(createCommentCallback, {
    postId,
    body: "",
  });

  //Error State
  const [error, setError] = useState({});

  //Post Context / Create comment function
  const { CreateComment } = useContext(PostsContext);

  function createCommentCallback() {
    if (values.body.trim() === "") {
      setError({
        message: "Comment must not be empty",
      });
    } else if (values.body.length > 350) {
      setError({
        message: "Comment is too long, less of 350 characters",
      });
    } else {
      CreateComment(values);
      setError({});
    }
    values.body = "";
  }

  return (
    <NewComment onSubmit={onSubmit} noValidate>
      <h2>New Comment </h2>
      <NewCommentTextArea
        id="body"
        placeholder="Comment"
        name="body"
        value={values.body}
        onChange={onChange}
      />
      {Object.keys(error).length > 0 && <Error>{error.message}</Error>}
      <InputNewComment type="submit" value="Submit" />
    </NewComment>
  );
};

export default NewCommentForm;
