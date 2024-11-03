import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNoteTodb } from "../../store/Slices/notesSlice";
import { Timestamp } from "firebase/firestore";

function AddNotes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddNote = (e) => {
    e.preventDefault();
    const userId = "user123";
    const note = {
      title,
      description,
      subject,
      createdBy: userId,
      lastEditedBy: userId,
      createdAt: Timestamp.now(),
      lastEditedAt: Timestamp.now(),
      collaborators: [userId],
    };
    console.log(note);
    dispatch(addNoteTodb(note));
    navigate("/")
  };

  return (
    <>
    
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
            boxShadow: 3,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add New Note
          </Typography>
          <Box component="form" sx={{ width: "100%" }}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              variant="outlined"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              variant="outlined"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Subject"
              variant="outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddNote}
            >
              Add Note
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default AddNotes;
