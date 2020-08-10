import React, { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  //New user State
  const [values, setValues] = useState(initialState);
  const onChange = (e) => {
    console.log(e.target.name);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
