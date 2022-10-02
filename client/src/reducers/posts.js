import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
} from "../constants/actionTypes";

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

// Basically , insert to the store the varibales to out array(AppState)
// The Store doesnot delete the previous AppState , but add it.
