import Head from "next/head";
import { css } from "@emotion/core";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MERNG Comment App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1
        css={css`
          color: red;
        `}
      >
        Create Next App
      </h1>
    </div>
  );
}
