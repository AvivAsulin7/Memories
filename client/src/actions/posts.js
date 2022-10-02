import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); // --> get all posts from backend
    dispatch({ type: "FETCH_ALL", payload: data }); // --> From here to Reducer
  } catch (error) {
    console.log(error);
  }
};

export const postCreate = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post); // --> add to DB array the new post
    dispatch({ type: "CREATE", payload: data }); // --> From here to Reducer
  } catch (error) {
    console.log(error);
  }
};

export const postUpdate = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); // --> send to the server (api index.js) the updated post (DB)
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postDelete = (id) => async (dispatch) => {
  try {
    await api.deletePost(id); // --> Make a delete request from DB
    dispatch({ type: "DELETE", payload: id }); //--> send object to Reducer , in order to update store
  } catch (error) {
    console.log(error);
  }
};
