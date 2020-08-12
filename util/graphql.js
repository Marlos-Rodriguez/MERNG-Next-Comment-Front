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