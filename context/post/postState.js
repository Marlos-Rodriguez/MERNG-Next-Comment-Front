import React, { useEffect, useReducer } from "react";
import PostContext from "./postContext";
import PostReducer from "./postReducer";

import { useQuery, useMutation } from "@apollo/react-hooks"; //Apollo Query & Mutation

//GraphQL commands
import {
  FETCH_POSTS_QUERY,
  DELETE_POST,
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
} from "../../util/graphql";

//Types Dispach
import {
  GET_POSTS,
  GET_POSTS_ERROR,
  ADD_POST,
  DELETE_POST_STATE,
  CREATE_COMMENT_STATE,
  DELETE_COMMENT_STATE,
} from "../../types/index";

const PostState = (props) => {
  const initialState = {
    posts: [],
    loadingPosts: true,
    errorPosts: null,
    newPost: null,
  };

  //Query function for all Post of Index Page
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);

  //Load in the start if loading ends and no error happends
  useEffect(() => {
    if (!loading && !error) {
      GetPosts(data.getPosts);
    } else if (error) {
      GetPostsError(error);
    }
  }, [loading]);

  //Use Reducer Dispatch
  const [state, dispatch] = useReducer(PostReducer, initialState);

  //Apollo Mutations

  //Delete Post
  const [deletePostMutation] = useMutation(DELETE_POST);

  //Delete Comment
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    update(_, { data: { deleteComment } }) {
      dispatch({
        type: DELETE_COMMENT_STATE,
        payload: deleteComment,
      });
    },
  });

  //Create Comment
  const [createCommentMutation] = useMutation(CREATE_COMMENT_MUTATION, {
    update(_, { data: { createComment } }) {
      dispatch({
        type: CREATE_COMMENT_STATE,
        payload: createComment,
      });
    },
  });

  //State Functions

  //Set posts to State
  const GetPosts = (posts) => {
    dispatch({
      type: GET_POSTS,
      payload: posts,
    });
  };

  //Set errors to state
  const GetPostsError = (error) => {
    dispatch({
      type: GET_POSTS_ERROR,
      payload: error,
    });
  };

  //Add new post in state
  const AddPost = (post) => {
    dispatch({
      type: ADD_POST,
      payload: post,
    });
  };

  //Delete Post
  const DeletePost = (postId) => {
    deletePostMutation({ variables: { postId } });
    dispatch({
      type: DELETE_POST_STATE,
      payload: postId,
    });
  };

  //Create comment
  const CreateComment = (commentInfo) => {
    createCommentMutation({ variables: commentInfo });
  };

  //Delete Comment
  const DeleteComment = (commentInfo) => {
    deleteCommentMutation({ variables: commentInfo });
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
        DeleteComment,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
