import React, { useEffect, useReducer } from "react";
import PostContext from "./postContext";
import PostReducer from "./postReducer";

import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../../util/graphql";

import { GET_POSTS, GET_POSTS_ERROR, ADD_POST } from "../../types/index";

const PostState = (props) => {
  const initialState = {
    posts: [],
    loadingPosts: true,
    errorPosts: null,
    newPost: null,
  };

  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);

  useEffect(() => {
    if (!loading && !error) {
      GetPosts(data.getPosts);
    } else if (error) {
      GetPostsError(error);
    }
  }, [loading]);

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const GetPosts = (posts) => {
    dispatch({
      type: GET_POSTS,
      payload: posts,
    });
  };

  const GetPostsError = (error) => {
    dispatch({
      type: GET_POSTS_ERROR,
      payload: error,
    });
  };

  const AddPost = (post) => {
    dispatch({
      type: ADD_POST,
      payload: post,
    });

    console.log(state.posts);
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        loadingPosts: state.loadingPosts,
        errorPosts: state.errorPosts,
        AddPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
