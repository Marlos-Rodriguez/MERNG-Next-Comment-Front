import React, { useContext, useState } from "react";
import Router from "next/router";
import { css } from "@emotion/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Layout from "../Components/layout/layout";
import { Formulario, Campo, InputSubmit, Error } from "../Components/UI/form";

import { useForm } from "../util/hooks";
import { AuthContext, ProtectAuthPages } from "../context/auth";

const Login = () => {
  const context = useContext(AuthContext);
  //Errors State
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(LoginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      Router.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function LoginUserCallback() {
    loginUser();
  }

  return (
    <Layout>
      <>
        <Formulario
          onSubmit={onSubmit}
          css={css`
            margin: 12rem auto;
          `}
          noValidate
        >
          <h1
            css={css`
              text-align: center;
            `}
          >
            Login
          </h1>
          <Campo>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={onChange}
            />
          </Campo>
          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={values.password}
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
          <InputSubmit type="submit" value="Login" />
        </Formulario>
      </>
    </Layout>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createAt
      token
    }
  }
`;

export default ProtectAuthPages(Login);
