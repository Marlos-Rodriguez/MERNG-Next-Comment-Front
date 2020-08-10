import React, { useReducer, createContext, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (typeof window !== "undefined") {
  if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
    } else {
      initialState.user = decodedToken;
    }
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
      {...props}
    ></AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export function ProtectRoute(Component) {
  return () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) Router.push("/login");
    }, [user]);

    return <Component {...arguments} />;
  };
}

export function ProtectAuthPages(Component) {
  return () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user) Router.push("/");
    }, [user]);

    return <Component {...arguments} />;
  };
}
