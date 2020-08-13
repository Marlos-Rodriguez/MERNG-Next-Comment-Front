import { GET_POSTS, GET_POSTS_ERROR, ADD_POST } from "../../types/index";

const PostReducer = (state, action) => {
  switch (action.type) {
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
        newPost: action.payload,
      };

    case GET_POSTS_ERROR:
      return {
        ...state,
        errorPosts: action.payload,
        loadingPosts: false,
      };

    default:
      return state;
  }
};

export default PostReducer;
