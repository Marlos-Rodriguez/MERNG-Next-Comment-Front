import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import { LOGIN, LOGOUT } from "../../types/index";

import jwtDecode from "jwt-decode";

const AuthState = (props) => {
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

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const Login = (userData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: LOGIN,
      payload: userData,
    });
  };

  const Logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        Login,
        Logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
