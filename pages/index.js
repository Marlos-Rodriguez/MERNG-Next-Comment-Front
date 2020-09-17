import React, { useContext } from "react";

import Layout from "../Components/layout/layout";
import PostCard from "../Components/layout/postCard";
import PostCardContainer from "../Components/UI/postCardContainer";

import PostContext from "../context/post/postContext";
import AuthContext from "../context/auth/authContext";

const Home = () => {
  //Get Context Post State
  const { posts, loadingPosts, errorPosts } = useContext(PostContext);
  //Get User Context
  const { user } = useContext(AuthContext);

  if (loadingPosts)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  return (
    <Layout>
      {errorPosts ? (
        <h1>Error: {errorPosts.message}</h1>
      ) : (
        <>
          <PostCardContainer>
            {posts.map((post) => {
              return <PostCard key={post.id} post={post} actualUser={user} />;
            })}
          </PostCardContainer>
        </>
      )}
    </Layout>
  );
};

export default Home;
