import React from "react";
import { css } from "@emotion/core";

import Layout from "../Components/layout/layout";
import { Formulario, Campo, InputSubmit, Error } from "../Components/UI/form";

const Login = () => {
  return (
    <Layout>
      <>
        <Formulario
          css={css`
            margin-top: 12rem;
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
            <label htmlFor="username">UserName</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
            />
          </Campo>
          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
            />
          </Campo>
          <InputSubmit type="submit" value="Login" />
        </Formulario>
      </>
    </Layout>
  );
};

export default Login;
