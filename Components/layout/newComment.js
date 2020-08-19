import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import styled from "@emotion/styled";

import { InputSubmit } from "../UI/form";

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
  //State Values
  const [values, setValues] = useState({
    postId,
  });

  //Post Context / Create comment function
  const { CreateComment } = useContext(PostsContext);

  const [createCommentMutation] = useMutation(CREATE_COMMENT_MUTATION, {
    update(_, { data: { createComment } }) {
      console.log(createComment);
    },
    variables: values,
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createCommentMutation();
  };

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
      <InputNewComment type="submit" value="Submit" />
    </NewComment>
  );
};

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      comments {
        id
        body
      }
      commentCount
    }
  }
`;

export default NewCommentForm;
