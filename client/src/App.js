import { useEffect, useState } from "react";
import "./App.css";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderRadius: 15,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" align="center">
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="70"
          style={{ marginLeft: "10px" }}
        ></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              {" "}
              <Posts setCurrentId={setCurrentId} />{" "}
            </Grid>
            <Grid item xs={12} sm={4}>
              {" "}
              <Form currentId={currentId} setCurrentId={setCurrentId} />{" "}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
