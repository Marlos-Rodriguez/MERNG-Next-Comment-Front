import React, { useState } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Layout from "../Components/layout/layout";
import { useForm } from "../util/hooks";
import { ProtectRoute } from "../context/auth";
import { Formulario, Campo, InputSubmit, Error } from "../Components/UI/form";

import { FETCH_POSTS_QUERY } from "../util/graphql";

const FormContainer = styled.div`
  min-height: 500px;
  height: 100%;
  width: 90%;
  padding: 2rem;
  margin: 1rem auto;
  background-color: #f1f1f1;
`;

const NewPost = () => {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
      Router.push("/");
    },
    onError(err) {
      setErrors(err);
      console.log(err);
    },
    variables: values,
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
                id="body"
                placeholder="Post Content"
                name="body"
                value={values.post}
                onChange={onChange}
              />
            </Campo>
            {Object.keys(errors).length > 0 && (
              <div>
                {Object.values(errors).map((value) => {
                  return <Error key={value}>{value}</Error>;
                })}
              </div>
            )}
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
      username
      commentCount
      likeCount
      createAt
    }
  }
`;

export default ProtectRoute(NewPost);
