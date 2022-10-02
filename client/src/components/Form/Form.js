import React, { useState, useEffect } from "react";
import { TextField, Typography, Paper, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { postCreate, postUpdate } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tag: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (currentId) {
      // if currentId !=null , if the user click the ... button on the post
      dispatch(postUpdate(currentId, postData));
    } else {
      dispatch(postCreate(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tag: "",
      selectedFile: "",
    });
  };

  return (
    <Paper>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSumbit}
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          sx={{ margin: "5px" }}
        ></TextField>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={{ margin: "5px" }}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          sx={{ margin: "5px" }}
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tag}
          onChange={(e) => setPostData({ ...postData, tag: e.target.value })}
          sx={{ margin: "5px" }}
        ></TextField>
        <div
          style={{
            width: "97%",
            margin: "20px 0 10px 90px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase>
        </div>
        <Button
          sx={{ margin: 2 }}
          variant="conatined"
          color="primary"
          size="large"
          type="sumbit"
          fullwidth
        >
          Sumbit
        </Button>
        <Button
          sx={{ margin: 2 }}
          variant="conatined"
          color="secondary"
          size="small"
          onClick={clear}
          fullwidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
