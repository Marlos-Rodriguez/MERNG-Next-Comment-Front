import React, { useState, useContext } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_POST_MUTATION } from "../util/graphql";

import PostContext from "../context/post/postContext";

import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Layout from "../Components/layout/layout";
import { useForm } from "../util/hooks";
import { ProtectRoute } from "../context/auth/authRoutes";
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
  const { AddPost } = useContext(PostContext);
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(_, result) {
      AddPost(result.data.createPost);
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
    if (values.body.trim() === "") {
      setErrors({
        message: "Post Body must not be empty",
      });
    } else if (values.body.length > 450) {
      setErrors({
        message: "Post Body is too long, less of 450 characters",
      });
    } else {
      createPost();
      setErrors({});
    }
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
            {Object.keys(errors).length > 0 && <Error>{errors.message}</Error>}
            <InputSubmit type="submit" value="Create Post" />
          </Formulario>
        </FormContainer>
      </>
    </Layout>
  );
};

export default ProtectRoute(NewPost);
