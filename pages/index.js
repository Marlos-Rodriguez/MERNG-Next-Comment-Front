import React, { useContext, useEffect } from "react";

import Layout from "../Components/layout/layout";
import PostCard from "../Components/layout/postCard";
import PostCardContainer from "../Components/UI/postCardContainer";
import PostContext from "../context/post/postContext";

const Home = () => {
  //Get Context Post State
  const { posts, loadingPosts, errorPosts, newPost } = useContext(PostContext);

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
              return <PostCard key={post.id} post={post} />;
            })}
          </PostCardContainer>
        </>
      )}
    </Layout>
  );
};

export default Home;
