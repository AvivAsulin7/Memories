import React, { useState, useEffect } from "react";
import { TextField, Typography, Paper, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { postCreate, postUpdate } from "../../actions/posts";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#2192FF",
  border: "1px solid black",
  borderRadius: "15px",
  textTransform: "capitalize",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#06283D",
    transition: "all .4s ease-in-out",
  },
});

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
    <Paper
      sx={{
        backgroundImage: "#fff",
        borderRadius: "20px",
        boxShadow: "0 0 7px 1px",
      }}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSumbit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Typography variant="h6" fontFamily="Montserrat" paddingBottom="10px">
          {currentId ? "Editing" : "Creating"} a Memory..
        </Typography>
        <TextField
          fullWidth={true}
          name="creator"
          variant="outlined"
          label="Creator"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          sx={{ margin: "5px" }}
        ></TextField>
        <TextField
          fullWidth={true}
          name="title"
          variant="outlined"
          label="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={{ margin: "5px" }}
        ></TextField>
        <TextField
          fullWidth={true}
          name="message"
          variant="outlined"
          label="Message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          sx={{ margin: "5px" }}
        ></TextField>
        <TextField
          fullWidth={true}
          name="tags"
          variant="outlined"
          label="Tags"
          value={postData.tag}
          onChange={(e) =>
            setPostData({ ...postData, tag: e.target.value.split(",") })
          }
          sx={{ margin: "5px" }}
        ></TextField>
        <div
          className="input-file"
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
        <CustomButton
          sx={{
            margin: 2,
          }}
          variant="conatined"
          type="sumbit"
        >
          Sumbit
        </CustomButton>
        <CustomButton
          sx={{
            margin: 2,
          }}
          variant="conatined"
          onClick={clear}
        >
          Clear
        </CustomButton>
      </form>
    </Paper>
  );
};

export default Form;
