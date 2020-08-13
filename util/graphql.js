import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      commentCount
      likeCount
      createAt
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      body
      username
      createAt
      likeCount
      commentCount
      comments {
        id
        username
        body
        createAt
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createAt
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      commentCount
      likeCount
      createAt
    }
  }
`;
