import "../styles/globals.css";
import React from "react";

import { AuthProvider } from "../context/auth";
import Apollo from "../Components/apolloProvider";

function MyApp({ Component, pageProps }) {
  return (
    <Apollo>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Apollo>
  );
}

export default MyApp;
