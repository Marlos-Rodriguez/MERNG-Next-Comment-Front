import React, { useState } from "react";
import Router from "next/router";
import { css } from "@emotion/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Layout from "../Components/layout/layout";
import { Formulario, Campo, InputSubmit, Error } from "../Components/UI/form";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const Register = () => {
  //Auth Context
  const context = useContext(AuthContext);
  //Errors State
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(RegisterUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Register new User
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      Router.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function RegisterUser() {
    addUser();
  }

  return (
    <Layout>
      <>
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
            Register
          </h1>
          <Campo>
            <label htmlFor="username">UserName</label>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={values.email}
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

          <Campo>
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
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

          <InputSubmit type="submit" value="Register" />
        </Formulario>
      </>
    </Layout>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;

export default Register;
