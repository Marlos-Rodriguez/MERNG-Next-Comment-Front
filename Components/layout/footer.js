import React from "react";
import { css } from "@emotion/core";

const Footer = () => {
  return (
    <>
      <footer
        css={css`
          background-color: rgba(18, 18, 18);
          margin-top: 5rem;
          padding: 1rem;
          width: 100%;
          top: 100%;
          align-items: right;
        `}
      >
        <p
          css={css`
            max-width: 1200px;
            margin: 0;
            margin-left: auto;
            padding: 0;
            color: #f1f1f1;
            text-align: right;
            @media (min-width: 768px) {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          `}
        >
          MERNG Comment App. Marlos Rodríguez Educational Project 2020 &copy;
        </p>
      </footer>
    </>
  );
};

export default Footer;
