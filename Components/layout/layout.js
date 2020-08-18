import React from "react";
import { Global, css } from "@emotion/core";
import Head from "next/head";

import Header from "./Header";
import Footer from "./footer";

const Layout = (props) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --gris: #3d3d3d;
            --gris2: #6f6f6f;
            --gris3: #e1e1e1;
            --naranja: #da552f;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            line-height: 1.5;
            font-family: "PT Sans", sans-serif;
          }
          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }
          h1,
          h2 {
            font-family: "Roboto Slab", serif;
            font-weight: 700;
          }
          h3 {
            font-family: "PT Sans", sans-serif;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          a {
            text-decoration: none;
          }
          img {
            max-width: 100%;
          }
          .Alert-Button {
            display: block;
            font-weight: 700;
            font-size: 2rem;
            padding: 0.6rem 1.7rem;
            margin: 2rem auto;
            text-align: center;
            border: none;
            border-radius: 0.5rem;
            background-color: #223254;
            color: white;
            &:hover {
              cursor: pointer;
            }
            @media (max-width: 768px) {
              margin: 2rem 1rem;
              align-self: center;
            }
          }
          .Alert-Button-Cancel {
            display: block;
            font-weight: 700;
            font-size: 2rem;
            padding: 0.6rem 1.7rem;
            margin: 2rem auto;
            text-align: center;
            margin-right: auto;
            border: none;
            border-radius: 0.5rem;
            background-color: #e81c1c;
            color: white;
            &:hover {
              cursor: pointer;
            }
            @media (max-width: 768px) {
              margin: 2rem 1rem;
              align-self: center;
            }
          }
        `}
      />
      <Head>
        <title>Comment App MERN y Next.js</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="Description"
          content="Comment Web Aplication with the stack MERN + GraphQL y Next js para el Front-End, With Post, likes and user pages"
        />
      </Head>

      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
