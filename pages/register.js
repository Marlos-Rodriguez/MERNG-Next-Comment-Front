import React, { useState } from "react";
import Router from "next/router";
import { css } from "@emotion/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Layout from "../Components/layout/layout";
import { Formulario, Campo, InputSubmit, Error } from "../Components/UI/form";

const Register = () => {
  //Errors State
  const [errors, setErrors] = useState({});

  //New user State
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //Register new User
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      Router.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <Layout>
      <>
        <Formulario onSubmit={onSubmit} noValidate>
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
