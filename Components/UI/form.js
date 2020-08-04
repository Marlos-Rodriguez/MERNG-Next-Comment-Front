import styled from "@emotion/styled";

export const Formulario = styled.form`
  max-width: 500px;
  min-height: 200px;
  width: 95%;
  margin: 5rem auto 0 auto;
  background-color: #f9f9f9;
  border: 1px solid #aaaaaa;
  border-radius: 1rem;
  padding: 2rem;
  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }
  input,
  textarea {
    flex: 1;
    padding: 1rem;
    border-radius: 0.8rem;
    border: 1px solid #454545;
    background-color: white;
  }
  textarea {
    height: 400px;
  }
`;

export const InputSubmit = styled.input`
  background-color: #223254;
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  border-radius: 2rem;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

export const Error = styled.p`
  background-color: red;
  padding: 1rem;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;
