import React from "react";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts); // fetch from store the posts
  console.log(posts);
  return !posts.length ? (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "50%",
          justifyContent: "center",
        }}
      >
        <Typography color="#fff" variant="h6">
          Loading...
        </Typography>
        <CircularProgress />{" "}
      </Box>
    </>
  ) : (
    <Grid
      sx={{ display: "flex", alignItems: "center" }}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
