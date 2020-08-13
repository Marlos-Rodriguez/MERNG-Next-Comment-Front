import React, { useContext, useEffect } from "react";
import Router from "next/router";

import AuthContext from "./authContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

const ProtectRoute = (Component) => {
  return () => {
    const { user } = useAuth();

    useEffect(() => {
      if (!user) Router.push("/login");
    }, [user]);

    return <Component {...arguments} />;
  };
};

const ProtectAuthPages = (Component) => {
  return () => {
    const { user } = useAuth();

    useEffect(() => {
      if (user) Router.push("/");
    }, [user]);

    return <Component {...arguments} />;
  };
};

export { ProtectAuthPages, ProtectRoute };
