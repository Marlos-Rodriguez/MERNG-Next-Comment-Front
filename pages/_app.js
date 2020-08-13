import "../styles/globals.css";
import React from "react";

import AuthProvider from "../context/auth/authState";
import PostProvider from "../context/post/postState";

import Apollo from "../Components/apolloProvider";

function MyApp({ Component, pageProps }) {
  return (
    <Apollo>
      <AuthProvider>
        <PostProvider>
          <Component {...pageProps} />
        </PostProvider>
      </AuthProvider>
    </Apollo>
  );
}

export default MyApp;
