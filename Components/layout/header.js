import React, { useContext } from "react";
import Link from "next/link";

import styled from "@emotion/styled";
import { css } from "@emotion/core";

import Boton from "../UI/Button";

import AuthContext from "../../context/auth/authContext";

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.a`
  color: #ffffff;
  font-size: 3rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;

  @media (max-width: 768px) {
    position: relative;
    align-self: center;
    margin: 0 auto;
  }

  &:hover {
    cursor: pointer;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    padding: 3rem;
    width: 100%;
    align-items: center;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    align-items: center;
    justify-content: center;
  }
`;

const Header = () => {
  const { user, Logout } = useContext(AuthContext);
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
        background-color: rgba(16, 21, 28);
      `}
    >
      <ContenedorHeader>
        <LogoContainer>
          <Link href="/">
            <Logo>Posts</Logo>
          </Link>
        </LogoContainer>
        <ButtonsContainer>
          {user ? (
            <>
              {" "}
              <h3
                css={css`
                  margin: 1rem 2rem;
                  color: white;
                  font-weight: bold;
                  letter-spacing: 1px;
                `}
              >
                {user.username}
              </h3>{" "}
              <Link href="/new">
                <Boton
                  bgColor="true"
                  css={css`
                    @media (max-width: 330px) {
                      font-size: 1.5rem;
                    }
                  `}
                >
                  New Post
                </Boton>
              </Link>
              <Boton onClick={Logout}>Logout</Boton>
            </>
          ) : (
            <>
              <Link href="/login">
                <Boton bgColor="true">Login</Boton>
              </Link>
              <Link href="/register">
                <Boton>Register</Boton>
              </Link>
            </>
          )}
        </ButtonsContainer>
      </ContenedorHeader>
    </header>
  );
};

export default Header;
