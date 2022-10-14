import { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import memories from "./images/memories.jpg";
import pattern from "./images/pattern.jpg";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useTheme } from "@mui/material";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
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
          boxShadow: "0 0 7px 1px",
        }}
      >
        <img src={memories} alt="memories" height="70"></img>
        <Typography
          variant="h2"
          align="center"
          fontFamily="Rancho"
          sx={{ marginLeft: "20px" }}
        >
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="70"
          style={{ marginLeft: "20px" }}
        ></img>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            direction={matches ? "column-reverse" : "none"}
            justify="space-between"
            alignItems={matches ? "center" : "stretch"}
            spacing={4}
          >
            <Grid item xs={12} sm={7} width={matches ? "100%" : null}>
              {" "}
              <Posts setCurrentId={setCurrentId} />{" "}
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              marginLeft="auto"
              width={matches ? "100%" : null}
            >
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
