import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const Footer = () => {
  return (
    <>
      <footer
        css={css`
          background-color: rgba(44, 62, 80);
          margin-top: 5rem;
          padding: 1rem;
          position: absolute;
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
          MERNG Comment. Todos los derechos Reservados 2020 &copy;
        </p>
      </footer>
    </>
  );
};

export default Footer;
