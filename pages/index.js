import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Layout from "../Components/layout/layout";
import PostCard from "../Components/layout/postCard";
import PostCardContainer from "../Components/UI/postCardContainer";

const Home = () => {
  const { loading, data, error } = useQuery(FETCH_POST_QUERY);

  if (loading)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  const posts = data.getPosts;
  return (
    <Layout>
      {error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <>
          <PostCardContainer>
            {posts.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </PostCardContainer>
        </>
      )}
    </Layout>
  );
};

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      comments {
        id
        username
        body
      }
      likes {
        id
        username
      }
    }
  }
`;

export default Home;
