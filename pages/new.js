import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Layout from "../Components/layout/layout";
import { useForm } from "../util/hooks";
import { ProtectRoute } from "../context/auth";
import { Formulario, Campo, InputSubmit, Error } from "../Components/UI/form";

const FormContainer = styled.div`
  min-height: 500px;
  height: 100%;
  width: 90%;
  padding: 2rem;
  margin: 1rem auto;
  background-color: #f1f1f1;
`;

const NewPost = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      console.log(result);
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <Layout>
      <>
        <FormContainer>
          <Formulario
            onSubmit={onSubmit}
            noValidate
            css={css`
              margin: 6rem auto;
            `}
          >
            <h1
              css={css`
                text-align: center;
              `}
            >
              New Post
            </h1>
            <Campo>
              <label
                htmlFor="Post"
                css={css`
                  margin-bottom: auto;
                  text-align: center;
                  font-weight: bold;
                `}
              >
                Post
              </label>
              <textarea
                id="post"
                placeholder="Post Content"
                name="post"
                value={values.post}
                onChange={onChange}
              />
            </Campo>
            <InputSubmit type="submit" value="Create Post" />
          </Formulario>
        </FormContainer>
      </>
    </Layout>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default ProtectRoute(NewPost);
