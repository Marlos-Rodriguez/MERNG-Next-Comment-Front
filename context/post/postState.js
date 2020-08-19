import React, { useEffect, useReducer } from "react";
import PostContext from "./postContext";
import PostReducer from "./postReducer";

import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FETCH_POSTS_QUERY,
  DELETE_POST,
  CREATE_COMMENT_MUTATION,
} from "../../util/graphql";

import {
  GET_POSTS,
  GET_POSTS_ERROR,
  ADD_POST,
  DELETE_POST_STATE,
  CREATE_COMMENT_STATE,
} from "../../types/index";

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

  const [deletePostMutation] = useMutation(DELETE_POST);

  const [createCommentMutation] = useMutation(CREATE_COMMENT_MUTATION, {
    update(_, { data }) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId: "5f36cfe27abe1b148c063253", body: "New comment 2" },
  });

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
  };

  const DeletePost = (postId) => {
    deletePostMutation({ variables: { postId } });
    dispatch({
      type: DELETE_POST_STATE,
      payload: postId,
    });
  };

  const CreateComment = (commentInfo) => {
    console.log(commentInfo);
    createCommentMutation();
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        loadingPosts: state.loadingPosts,
        errorPosts: state.errorPosts,
        AddPost,
        DeletePost,
        CreateComment,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
