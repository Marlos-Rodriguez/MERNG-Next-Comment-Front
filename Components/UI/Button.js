import styled from "@emotion/styled";

const Button = styled.a`
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.6rem 1.7rem;
  margin: 2rem auto;
  text-align: center;
  margin-right: 1rem;
  border-radius: 1.5rem;
  background-color: ${(props) => (props.bgColor ? "#223254" : "white")};
  color: ${(props) => (props.bgColor ? "white" : "#000")};
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
