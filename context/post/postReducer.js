import {
  GET_POSTS,
  GET_POSTS_ERROR,
  ADD_POST,
  DELETE_POST_STATE,
  CREATE_COMMENT_STATE,
  DELETE_COMMENT_STATE,
} from "../../types/index";

const PostReducer = (state, action) => {
  switch (action.type) {
    //Set Post to state
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadingPosts: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case GET_POSTS_ERROR:
      return {
        ...state,
        errorPosts: action.payload,
        loadingPosts: false,
      };
    case DELETE_POST_STATE:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    //Create Comment
    case CREATE_COMMENT_STATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          //If is the same ID set the commentCount
          if (post.id === action.payload.id) {
            post.commentCount = action.payload.commentCount;
          }
        }),
      };

    case DELETE_COMMENT_STATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          //If have same ID set the Comment Count
          if (post.id === action.payload.id) {
            post.commentCount = action.payload.commentCount;
            return post;
          }
          return post;
        }),
      };

    default:
      return state;
  }
};

export default PostReducer;
